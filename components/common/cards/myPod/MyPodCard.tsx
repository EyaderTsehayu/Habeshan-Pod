import { View, Text, Image, TouchableOpacity } from "react-native";
import myPodCardStyle from "./myPodCard.style";
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

const MyPodCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={myPodCardStyle.container}>
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
      <TouchableOpacity>
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

export default MyPodCard;
