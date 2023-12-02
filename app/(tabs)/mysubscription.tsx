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
  //const tabs = ["Sport","Technology","Business","Self Development"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
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
          headerRight: () => (
            <View style={styles.myPods}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  marginTop: 12,
                  flexDirection: "row",
                  columnGap: 12,
                }}
              >
                <Text style={styles.headerTxt}>My Subscription</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <View style={styles.container}>
        <View>
          <View style={styles.followCont}>
            <Text style={styles.followPodTxt}>Follow Podcasts</Text>
            <Text style={styles.followPodSubText}>
              Based on your favorites genres, here are pods that suit you best.
            </Text>
          </View>
        </View>
        <Genres />
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
    paddingVertical: 14,
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
});
