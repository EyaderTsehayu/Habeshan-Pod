import { View, Text, Image, TouchableOpacity } from "react-native";
import commentCardStyles from "./commentCard.style";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";

interface Item {
  userId: string;
  comment: string;
  createdAt: any;
  podcastId: string;
  firstname: string | null;
  lastname: string | null;
  imageUri: string;
}

const CommentCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={commentCardStyles.container}>
      <View style={commentCardStyles.description}>
        <Image
          style={commentCardStyles.cover}
          source={{ uri: item.imageUri }}
        />
        <View style={commentCardStyles.detailsContainer}>
          <Text style={commentCardStyles.title}>
            {item.firstname} {item.lastname}
          </Text>

          <View style={commentCardStyles.iconTextContainer}>
            <Text style={commentCardStyles.commentText}>{item.comment}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommentCard;
