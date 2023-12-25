import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { BackHandler } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import useFirebaseData from "@/hooks/fetchData";
import Colors from "@/constants/Colors";
import CommentSheet from "../../components/player/comments";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const AudioPlayer = () => {
  const { podcasts, myPodData, trendingPodData } = useFirebaseData();
  const { index, data } = useLocalSearchParams();
  const [podToPlay, setPodToPlay] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const router = useRouter();

  const updatePodToPlay = () => {
    if (data === "myPodData") {
      setPodToPlay(myPodData);
    } else if (data === "trendingPodData") {
      setPodToPlay(trendingPodData);
    } else {
      setPodToPlay(podcasts);
    }
  };

  useEffect(() => {
    updatePodToPlay();
  }, [data, myPodData, podcasts]);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: false,
        });
        if (podToPlay && podToPlay.length > 0) {
          loadAudio();
        }
      } catch (e) {
        console.log(e);
      }
    };

    setupAudio();
    return () => {
      if (playbackInstance) {
        playbackInstance.stopAsync();
      }
    };
  }, [podToPlay, currentIndex]);

  useEffect(() => {
    const backAction = () => {
      if (playbackInstance) {
        playbackInstance.stopAsync();
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      if (playbackInstance) {
        playbackInstance.stopAsync();
      }
    };
  }, [playbackInstance]);

  const loadAudio = async () => {
    try {
      if (playbackInstance !== null) {
        await playbackInstance.unloadAsync();
      }

      const newPlaybackInstance = new Audio.Sound();
      const source = {
        uri: podToPlay[currentIndex].audioUrl,
      };

      const status = {
        shouldPlay: isPlaying,
        volume: volume,
      };

      newPlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      await newPlaybackInstance.loadAsync(source, status, false);
      setPlaybackInstance(newPlaybackInstance);
    } catch (e) {
      console.log(e);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(status.isBuffering);
    setPositionMillis(status.positionMillis);
    setDurationMillis(status.durationMillis);
  };

  const handlePlayPause = async () => {
    if (playbackInstance) {
      isPlaying
        ? await playbackInstance.pauseAsync()
        : await playbackInstance.playAsync();

      setIsPlaying(!isPlaying);
    }
  };

  const handlePreviousTrack = async () => {
    let newIndex = (currentIndex - 1 + podToPlay.length) % podToPlay.length;
    setCurrentIndex(newIndex);
    setIsPlaying(false);
  };

  const handleNextTrack = async () => {
    let newIndex = (currentIndex + 1) % podToPlay.length;
    setCurrentIndex(newIndex);
    setIsPlaying(false);
  };

  const handleSliderChange = async (value) => {
    if (playbackInstance) {
      await playbackInstance.setPositionAsync(value);
    }
  };

  const formatTime = (milliseconds) => {
    if (milliseconds >= 0) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "0:00";
  };

  if (!podToPlay || podToPlay.length === 0) {
    return <ActivityIndicator />; // Render a loading indicator until data is fetched
  }
  const renderFileInfo = () => {
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {podToPlay[currentIndex].title} - #{podToPlay[currentIndex].episode}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {podToPlay[currentIndex].firstName}&nbsp;
          {podToPlay[currentIndex].lastName}
        </Text>
      </View>
    ) : null;
  };

  const progress = positionMillis / durationMillis;
  if (!podToPlay || podToPlay.length === 0) {
    return <ActivityIndicator />; // Render a loading indicator until data is fetched
  }
  // console.log("get podcast id specific", podToPlay[currentIndex].id);
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
              uri: podToPlay[currentIndex].coverImageUrl,
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
            maximumValue={durationMillis}
            value={positionMillis}
            minimumTrackTintColor="#550088"
            maximumTrackTintColor="#000000"
            onSlidingComplete={handleSliderChange}
          />

          <Text style={styles.trackInfoText}>
            {formatTime(positionMillis)} / {formatTime(durationMillis)}
          </Text>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.control}
              onPress={handlePreviousTrack}
            >
              <Ionicons
                name="play-skip-back-circle-outline"
                size={34}
                color={Colors.lightNavy}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
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
            <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
              <Ionicons
                name="play-skip-forward-circle-outline"
                size={34}
                color={Colors.lightNavy}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CommentSheet podcastId={podToPlay[currentIndex].id} />
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
    //  paddingTop: 10,
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
