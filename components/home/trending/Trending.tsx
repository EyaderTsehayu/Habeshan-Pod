import { View, Text, TouchableOpacity, FlatList } from "react-native";
import trendingStyle from "./trending.style";
import React from "react";
import TrendingPodCard from "@/components/common/cards/trending/TrendingPodCard";

const Trending = () => {
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
    <View style={trendingStyle.container}>
      <View style={trendingStyle.headerContainer}>
        <Text style={trendingStyle.headerTitle}>Trending</Text>
        <Text style={trendingStyle.showAllBtn}>
          <TouchableOpacity>
            <Text style={trendingStyle.subText}>Show all</Text>
          </TouchableOpacity>{" "}
        </Text>
      </View>
      <View style={trendingStyle.cardContainer}>
        {data.map((item) => (
          <TrendingPodCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default Trending;
