import { View, Text, Image, TouchableOpacity } from "react-native";
import trendingCardStyle from "./trendingPodCard.style";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";
interface Item {
  id: string;
  title: string;
  creator: string;
  cover: string;
}

const TrendingPodCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={trendingCardStyle.container}>
      <View style={trendingCardStyle.description}>
        <Image style={trendingCardStyle.cover} source={{ uri: item.cover }} />
        <View style={trendingCardStyle.detailsContainer}>
          <Text style={trendingCardStyle.title}>{item.title}</Text>
          <Text style={trendingCardStyle.creator}>By {item.creator}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <AntDesign name="play" size={46} color={Colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrendingPodCard;
