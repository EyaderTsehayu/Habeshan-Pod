import { View, Text, Image, TouchableOpacity } from "react-native";
import recommendedPodCardStyles from "./recommendedPodCard.style";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";

interface Item {
  id: string;
  title: string;
  creator: string;
  cover: string;
  followers: number;
  podcasts: number;
  likes: number;
}

const RecommendedPodCard = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity style={recommendedPodCardStyles.container}>
      <View style={recommendedPodCardStyles.description}>
        <Image
          style={recommendedPodCardStyles.cover}
          source={{ uri: item.cover }}
        />
        <View style={recommendedPodCardStyles.detailsContainer}>
          <Text style={recommendedPodCardStyles.title}>{item.title}</Text>
          <View style={recommendedPodCardStyles.creator}>
            <View style={recommendedPodCardStyles.iconTextContainer}>
              <SimpleLineIcons
                name="user-following"
                size={14}
                color={Colors.headerText}
              />
              <Text>{item.followers}</Text>
            </View>
            <View style={recommendedPodCardStyles.iconTextContainer}>
              <AntDesign
                name="sound"
                size={16}
                color={Colors.headerText} // Set your color here
              />
              <Text>{item.podcasts}</Text>
            </View>
            <View style={recommendedPodCardStyles.iconTextContainer}>
              <AntDesign
                name="like2"
                size={16}
                color={Colors.headerText} // Set your color here
              />
              <Text>{item.likes}</Text>
            </View>
          </View>
          <TouchableOpacity style={recommendedPodCardStyles.followBtn}>
            <Text style={recommendedPodCardStyles.followBtnTxt}> Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedPodCard;
