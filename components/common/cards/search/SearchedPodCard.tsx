import { View, Text, Image, TouchableOpacity } from "react-native";
import myPodCardStyle from "./searchedPodCard.style";
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

const SearchedPodCard: React.FC<MyPodCardProps> = ({
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
      params: { index: index, data: "searchedPod" },
    });
  };
  const handleToDetails = () => {
    router.push(`../pod-details/${item.id}`);
  };

  return (
    <TouchableOpacity
      style={myPodCardStyle.container}
      onPress={handleToDetails}
    >
      <View style={myPodCardStyle.description}>
        <Image
          style={myPodCardStyle.cover}
          source={{ uri: item.coverImageUrl }}
        />
        <View style={myPodCardStyle.detailsContainer}>
          <Text style={myPodCardStyle.title}>{item.title}</Text>
          <Text style={myPodCardStyle.episode}>Episode - {item.episode}</Text>
          <Text style={myPodCardStyle.creator}>
            By {item.firstName}&nbsp;{item.lastName}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePodcastPress}>
        <AntDesign
          style={myPodCardStyle.playBtn}
          name="play"
          size={58}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchedPodCard;
