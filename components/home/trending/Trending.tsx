import { View, Text, TouchableOpacity } from "react-native";
import trendingStyle from "./trending.style";
import React from "react";

const Trending = () => {
  return (
    <View style={trendingStyle.container}>
      <View style={trendingStyle.headerContainer}>
        <Text style={trendingStyle.headerTitle}>Trending</Text>
        <Text style={trendingStyle.showAllBtn}>
          <TouchableOpacity>
            <Text style={trendingStyle.subText}>Show all</Text>
          </TouchableOpacity>{" "}
        </Text>
      </View>
    </View>
  );
};

export default Trending;
