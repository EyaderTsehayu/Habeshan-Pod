import { View, Text, Image, TouchableOpacity } from "react-native";
import trendingCardStyle from "./trendingPodCard.style";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
interface Item {
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  episode: number;
  coverImageUrl: string;
}
interface Podcast {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  audioUrl: string;
  coverImageUrl: string;
  description: string;
  episode: number;
}

interface MyPodCardProps {
  item: Podcast;
  index: number;
  podcasts: Podcast[];
}

const TrendingPodCard: React.FC<MyPodCardProps> = ({
  item,
  index,
  podcasts,
}) => {
  const router = useRouter();

  const podcastItem = {
    index: index,
    podcasts: podcasts,
  };

  const handlePodcastPress = () => {
    router.push({
      pathname: "/pod-player/player",
      params: { index: index, data: "trendingPodData" },
    });
  };
  return (
    <TouchableOpacity
      style={trendingCardStyle.container}
      onPress={handlePodcastPress}
    >
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
