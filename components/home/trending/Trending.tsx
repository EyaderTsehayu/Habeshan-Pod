import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import trendingStyle from "./trending.style";
import React, { useEffect, useState } from "react";
import TrendingPodCard from "@/components/common/cards/trending/TrendingPodCard";
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

const Trending: React.FC = () => {
  const { trendingPodData } = useFirebaseData();

  return (
    <View style={trendingStyle.container}>
      <View style={trendingStyle.headerContainer}>
        <Text style={trendingStyle.headerTitle}>Trending</Text>
        <Text style={trendingStyle.showAllBtn}>
          <TouchableOpacity>
            <Text style={trendingStyle.subText}>Show all</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={trendingStyle.cardContainer}>
        {/* {podcasts.map((item) => (
          <TrendingPodCard key={item.id} item={item} />
        ))} */}
        {trendingPodData.length < 1 ? (
          <View style={trendingStyle.activity}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          trendingPodData.map((item, index) => (
            <TrendingPodCard
              key={item.id}
              item={item}
              index={index}
              podcasts={trendingPodData}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Trending;
