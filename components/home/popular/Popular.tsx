import { View, Text, TouchableOpacity, FlatList } from "react-native";
import popularStyle from "./popular.style";
import React from "react";
import PopularPodCard from "@/components/common/cards/popular/PopularPodCard";

const Popular = () => {
  const data = [
    {
      id: "1",
      title: "Silcon valley stories",
      creator: "Richard Hendric",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "2",
      title: "Silcon valley stories",
      creator: "Erlich Bachman",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "3",
      title: "Silcon valley stories",
      creator: "Gilfoyel",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "4",
      title: "Silcon valley stories",
      creator: "Denish",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "5",
      title: "Silcon valley stories",
      creator: "Jared",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "6",
      title: "Silcon valley stories",
      creator: "Jien yang",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "7",
      title: "Silcon valley stories",
      creator: "Jien Yang",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
  ];
  return (
    <View style={popularStyle.container}>
      <View style={popularStyle.headerContainer}>
        <Text style={popularStyle.headerTitle}>Popular pods</Text>
        <Text style={popularStyle.showAllBtn}>
          <TouchableOpacity>
            <Text style={popularStyle.subText}>Show all</Text>
          </TouchableOpacity>{" "}
        </Text>
      </View>
      <View style={popularStyle.cardContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <PopularPodCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ columnGap: 25 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Popular;
