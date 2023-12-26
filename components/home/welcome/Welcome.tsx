import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import welcomeStyles from "./welcome.style";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
//import podcast from "@/assets/images/podcast.png";

interface WelcomeProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  handleClick: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({
  setSearchTerm,
  searchTerm,
  handleClick,
}) => {
  return (
    <View style={welcomeStyles.container}>
      <View style={welcomeStyles.searchContainer}>
        <View style={welcomeStyles.searchWrapper}>
          <TextInput
            style={welcomeStyles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search your favorite pods  . . ."
            placeholderTextColor={Colors.lightBg1}
          />
        </View>
        <TouchableOpacity style={welcomeStyles.searchBtn} onPress={handleClick}>
          <Ionicons name="search" size={24} color={Colors.primaryText} />
        </TouchableOpacity>
      </View>
      <View style={welcomeStyles.hero}>
        <View style={welcomeStyles.welcomeMsgContainer}>
          <Text style={welcomeStyles.welcomeMsg}>
            Discover your favorite
            <Text style={{ fontFamily: "dm-b", fontSize: 40 }}>podcast</Text>
          </Text>
        </View>
        <View>
          <Image
            source={require("../../../assets/images/podcast.png")}
            style={welcomeStyles.welcomeImg}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
