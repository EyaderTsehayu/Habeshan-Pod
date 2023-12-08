import { View, Text, Image, TouchableOpacity } from "react-native";
import trendingCardStyle from "./trendingPodCard.style";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";
interface Item {
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  episode: number;
  coverImageUrl: string;
}

const TrendingPodCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={trendingCardStyle.container}>
      <View style={trendingCardStyle.description}>
        <Image
          style={trendingCardStyle.cover}
          source={{ uri: item.coverImageUrl }}
        />
        <View style={trendingCardStyle.detailsContainer}>
          <Text style={trendingCardStyle.title}>{item.title}</Text>
          <Text style={trendingCardStyle.episode}>
            Episode - {item.episode}
          </Text>
          <Text style={trendingCardStyle.creator}>
            By {item.firstName}&nbsp;{item.lastName}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <AntDesign
          style={trendingCardStyle.playBtn}
          name="play"
          size={58}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrendingPodCard;
