import { View, Text, TouchableOpacity, FlatList } from "react-native";
import recommendedPodStyles from "./recommendedPods.styles";
import React from "react";
import RecommendedPodCard from "@/components/common/cards/recommendedPod/RecommendedPodCard";

const RecommendedPods = () => {
  const data = [
    {
      id: "1",
      title: "You're Wrong About",
      creator: "Richard Hendric",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=1GfVd3agdJVzO8yp83HBovnSJHfBg0vLP",
    },
    {
      id: "2",
      title: "Bang Bang",
      creator: "Erlich Bachman",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=1NC99UjyDz5aEuhXl90_jVKrudVImFlMd",
    },
    {
      id: "3",
      title: "Ask The Mentor",
      creator: "Gilfoyel",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=126CNPEjWla_7kJVzU4blTJAEupSUrknr",
    },
    {
      id: "4",
      title: "You're Wrong About",

      creator: "Denish",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=1GfVd3agdJVzO8yp83HBovnSJHfBg0vLP",
    },
    {
      id: "5",
      title: "Bang Bang",
      creator: "Jared",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=1NC99UjyDz5aEuhXl90_jVKrudVImFlMd",
    },
    {
      id: "6",
      title: "Ask The Mentor",
      creator: "Jien yang",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=126CNPEjWla_7kJVzU4blTJAEupSUrknr",
    },
    {
      id: "7",
      title: "Silcon valley stories",
      creator: "Jien Yang",
      podcasts: 12,
      followers: 2230,
      likes: 94520,
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
  ];
  return (
    <View style={recommendedPodStyles.container}>
      <View style={recommendedPodStyles.cardContainer}>
        {data.map((item) => (
          <RecommendedPodCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default RecommendedPods;
