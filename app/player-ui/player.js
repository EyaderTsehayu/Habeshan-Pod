import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { BackHandler } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFirebaseData from "@/hooks/fetchData";
import Colors from "@/constants/Colors";
import CommentSheet from "../../components/player/comments";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AudioPlayer = () => {
  const isPlaying = false;
  const renderFileInfo = () => {
    return (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          #12 The Daily Enterainments
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          Eyader Tsehayu
        </Text>
        {/* <Text style={[styles.trackInfoText, styles.smallText]}>
          Daily new podcast with enterainments
        </Text> */}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                    marginTop: 26,
                    marginRight: 24,
                  }}
                >
                  <Ionicons
                    name="share-social"
                    size={28}
                    color={Colors.headerText}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        <View style={styles.imageContainer}>
          <Image
            style={styles.albumCover}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/habeshan-pod.appspot.com/o/podcasts%2FThe%20Daily%2FcoverImage.jpg?alt=media&token=835bcb86-1668-46c3-9342-ffc22488a80d",
            }}
          />
          <View style={styles.diskMask}></View>
        </View>
        <View style={styles.maskContainer}>
          <View style={styles.mask}></View>
        </View>

        {renderFileInfo()}

        <View style={styles.controlsCont}>
          <Slider
            style={{ width: 300, marginTop: 20 }}
            minimumValue={0}
            maximumValue={10}
            value={0}
            minimumTrackTintColor="#550088"
            maximumTrackTintColor="#000000"
          />
          <Text style={styles.trackInfoText}>0.00/32.2</Text>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.control}>
              <Ionicons
                name="play-skip-back-circle-outline"
                size={34}
                color={Colors.lightNavy}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.control}>
              {isPlaying ? (
                <Ionicons
                  name="pause-circle"
                  size={60}
                  color={Colors.primary}
                />
              ) : (
                <Ionicons name="play-circle" size={60} color={Colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.control}>
              <Ionicons
                name="play-skip-forward-circle-outline"
                size={34}
                color={Colors.lightNavy}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CommentSheet />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    marginTop: 8,
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    position: "relative",
  },
  albumCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  diskMask: {
    position: "absolute",
    width: 30, // Adjust size of the inner disk here
    height: 30, // Adjust size of the inner disk here
    borderRadius: 15, // Half of the width and height to make it circular
    backgroundColor: Colors.lightBg, // Color of the inner disk
    top: "50%", // Adjust to center vertically
    left: "50%", // Adjust to center horizontally
    marginTop: -15, // Adjust half of the height to center vertically
    marginLeft: -15, // Adjust half of the width to center horizontally
    borderColor: "#fff",
    borderWidth: 2,
  },
  maskContainer: {
    marginTop: 8,

    position: "absolute",
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  mask: {
    width: 155,
    height: 155,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff", // Adjust glow color and intensity here
    backgroundColor: "transparent",
  },
  trackInfo: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    //  backgroundColor: "#fff",
  },

  trackInfoText: {
    paddingTop: 10,
    textAlign: "center",
    flexWrap: "wrap",
    fontFamily: "dm",
    fontSize: 14,
    color: Colors.lightNavy,
  },
  largeText: {
    fontSize: 18,
    color: Colors.headerText,
    fontFamily: "dm-b",
  },
  smallText: {
    paddingTop: 12,
    fontSize: 16,
    color: Colors.lightNavy,
    fontFamily: "dm-sb",
  },
  control: {
    margin: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  controlsCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.lightBg,
    borderRadius: 30,
    paddingHorizontal: 18,
    // paddingVertical: 12,
  },
});

export default AudioPlayer;
