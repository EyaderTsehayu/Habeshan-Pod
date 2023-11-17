import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import popularCardStyle from "./popularPodCard.style";

interface Item {
  id: string;
  title: string;
  creator: string;
  cover: string;
}

const PopularPodCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={popularCardStyle.container}>
      <Image style={popularCardStyle.cover} source={{ uri: item.cover }} />
      <Text style={popularCardStyle.title}>{item.title}</Text>
      <Text style={popularCardStyle.creator}>By {item.creator}</Text>
    </TouchableOpacity>
  );
};

export default PopularPodCard;
