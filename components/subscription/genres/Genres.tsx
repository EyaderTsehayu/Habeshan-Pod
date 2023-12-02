import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import genreStyles from "./genres.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Genre {
  genre: string;
  id: string;
  icon: string;
  uri: string;
}

const Genres: React.FC = () => {
  const tabs: Genre[] = [
    { genre: "Technology", id: "1", icon: "laptop", uri: "/(tabs)/" },
    { genre: "Business", id: "2", icon: "briefcase", uri: "/(tabs)/" },
    { genre: "Sport", id: "3", icon: "basketball", uri: "/(tabs)/" },
    { genre: "Self Development", id: "4", icon: "book-open", uri: "/(tabs)/" },
    { genre: "Entertainment", id: "5", icon: "popcorn", uri: "/(tabs)/" },
  ];

  const router = useRouter();

  return (
    <View style={genreStyles.container}>
      <View style={genreStyles.headerContainer}>
        <Text style={genreStyles.headerText}>Genres</Text>

        <TouchableOpacity style={genreStyles.showAllBtn}>
          <AntDesign name="arrowright" size={30} color={Colors.headerText} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={genreStyles.btn}
            onPress={() => router.push(item.uri)}
          >
            <View style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <MaterialCommunityIcons
                name={item.icon}
                size={42}
                color={Colors.lightNavy}
                style={genreStyles.icon}
              />
              <Text style={genreStyles.btnText}>{item.genre}</Text>
              <Text style={genreStyles.btnSubText}>14 podcasts</Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ columnGap: 6 }}
      />
    </View>
  );
};

export default Genres;
