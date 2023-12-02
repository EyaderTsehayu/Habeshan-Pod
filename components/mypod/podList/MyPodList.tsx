import { View, Text, TouchableOpacity } from "react-native";
import myPodListstyles from "./myPodList.styles";
import React from "react";
import TrendingPodCard from "@/components/common/cards/trending/TrendingPodCard";
import { Image } from "react-native";

const MyPodList = () => {
  const data = [
    {
      id: "1",
      title: "Being an Engineer",
      creator: "Eyader Tsehayu",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "2",
      title: "Being an Engineer",
      creator: "Eyader Tsehayu",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "3",
      title: "Being an Engineer",
      creator: "Eyader Tsehayu",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "4",
      title: "Being an Engineer",
      creator: "Eyader Tsehayu",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "5",
      title: "Being an Engineer",
      creator: "Eyader Tsehayu",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
    {
      id: "6",
      title: "Being an Engineer",
      creator: "Eyader Tsehayu",
      cover:
        "https://drive.google.com/uc?export=view&id=1KbOjPhyM_4pNN8INfKEmkLu5E9BhP-Fr",
    },
  ];
  let data1 = false;
  if (data1) {
    return (
      <View style={myPodListstyles.container}>
        <View style={myPodListstyles.headerContainer}>
          <Text style={myPodListstyles.headerTitle}>My Tracks</Text>
        </View>
        <View style={myPodListstyles.cardContainer}>
          {data.map((item) => (
            <TrendingPodCard key={item.id} item={item} />
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
