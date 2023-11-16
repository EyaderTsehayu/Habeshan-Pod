import { View, Text, TouchableOpacity } from "react-native";
import popularStyle from "./popular.style";
import React from "react";

const Popular = () => {
  return (
    <View style={popularStyle.container}>
      <View style={popularStyle.headerContainer}>
        <Text style={popularStyle.headerTitle}>Popular pods</Text>
        <Text style={popularStyle.showAllBtn}>
          <TouchableOpacity>
            <Text style={popularStyle.subText}>Show all</Text>
          </TouchableOpacity>{" "}
        </Text>
      </View>
    </View>
  );
};

export default Popular;
