import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MyPodList from "@/components/mypod/podList/MyPodList";
import Genres from "@/components/subscription/genres/Genres";
import RecommendedPods from "@/components/subscription/recommendedPods/RecommendedPods";
import { useState } from "react";

const Page = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.cardBg },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 24, marginTop: 12 }}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors.headerText}
              />
            </TouchableOpacity>
          ),
          // headerRight: () => (
          //   <View style={styles.myPods}>
          //     <TouchableOpacity
          //       style={{
          //         display: "flex",
          //         marginTop: 12,
          //         flexDirection: "row",
          //         columnGap: 12,
          //       }}
          //     >
          //       <Text style={styles.headerTxt}>My Subscription</Text>
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />

      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            gap: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 4,
          }}
        >
          <View style={styles.followCont}>
            <Text style={styles.followPodTxt}>Follow Podcasts</Text>
            <Text style={styles.followPodSubText}>
              Based on your favorites genres, here are pods that suit you best.
            </Text>
          </View>
          <Image
            source={require("../../assets/images/podcast-mic.png")}
            style={styles.podImg}
          />
        </View>
        <Genres />
        <View style={styles.RecommendedPodsPodCont}>
          <View
            style={{
              flex: 1,
              borderColor: Colors.cardBg,
              borderWidth: 5,
              borderRightWidth: 44,

              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          ></View>
          <Text style={styles.RecommendedPodsPodTxt}>Recommended pods</Text>
        </View>
        <ScrollView>
          <RecommendedPods />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardBg,
  },
  headerTxt: {
    fontFamily: "dm-b",
    fontSize: 24,
    color: Colors.headerText,
  },
  myPods: {
    marginRight: 24,
  },

  followCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: 24,
    // paddingVertical: 14,
    width: "60%",
  },
  followPodSubText: {
    color: Colors.lightNavy,
    fontFamily: "dm-sb",
    paddingTop: 8,
    fontSize: 16,
  },
  followPodTxt: {
    color: Colors.headerText,
    fontFamily: "dm-b",
    fontSize: 32,
  },
  RecommendedPodsPodCont: {
    alignItems: "center",
    marginTop: 12,
    paddingTop: 16,
    backgroundColor: Colors.lightBg1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  RecommendedPodsPodTxt: {
    color: Colors.headerText,
    padding: 12,

    fontFamily: "dm-b",
    fontSize: 28,
  },
  podImg: {
    resizeMode: "contain",

    width: 100,
    height: 120,
  },
});
