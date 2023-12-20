import { View, Text, TouchableOpacity } from "react-native";
import myPodListstyles from "./myPodList.styles";
import React, { useEffect, useState } from "react";
import MyPodCard from "@/components/common/cards/myPod/MyPodCard";
import { Image } from "react-native";
import useFirebaseData from "@/hooks/fetchData";

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
const MyPodList = () => {
  const { myPodData } = useFirebaseData();

  if (myPodData.length > 0) {
    return (
      <View style={myPodListstyles.container}>
        <View style={myPodListstyles.headerContainer}>
          <Text style={myPodListstyles.headerTitle}>My Tracks</Text>
        </View>
        <View style={myPodListstyles.cardContainer}>
          {myPodData.map((item, index) => (
            <MyPodCard
              key={item.id}
              item={item}
              index={index}
              podcasts={myPodData}
            />
          ))}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={myPodListstyles.noPodcastTxt}>
          You have not posted a podacast yet.
        </Text>
        <Image
          source={require("../../../assets/images/nopost.png")}
          style={myPodListstyles.noPostImg}
        />
      </View>
    );
  }
};

export default MyPodList;
