import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import relatedCardStyle from "./RelatedPodCard.style";

interface Item {
  id: string;
  title: string;
  episode: string;
  coverImageUrl: string;
}

const RelatedPodCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={relatedCardStyle.container}>
      <Image
        style={relatedCardStyle.cover}
        source={{ uri: item.coverImageUrl }}
      />
      <Text style={relatedCardStyle.title}>{item.title}</Text>
      <Text style={relatedCardStyle.creator}>Episode - {item.episode}</Text>
    </TouchableOpacity>
  );
};

export default RelatedPodCard;
