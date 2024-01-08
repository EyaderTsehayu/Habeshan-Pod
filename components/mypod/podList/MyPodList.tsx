import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import myPodListstyles from "./myPodList.styles";
import React, { useEffect, useState } from "react";
import MyPodCard from "@/components/common/cards/myPod/MyPodCard";
import { Image } from "react-native";
import useFirebaseData from "@/hooks/fetchData";
import Colors from "@/constants/Colors";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading delay with setTimeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={myPodListstyles.activity}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
