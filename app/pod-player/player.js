import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { BackHandler } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFirebaseData from "@/hooks/fetchData";

const AudioPlayer = () => {
  const { podcasts, myPodData } = useFirebaseData();
  const { index, data } = useLocalSearchParams();
  const [podToPlay, setPodToPlay] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  const updatePodToPlay = () => {
    if (data === "myPodData") {
      setPodToPlay(myPodData);
    } else {
      setPodToPlay(podcasts);
    }
  };

  useEffect(() => {
    console.log("First rendered");
    console.log("From Audio Player Pod to Play", podToPlay);

    updatePodToPlay();
    console.log("From Audio Player Pod to Play 1", podToPlay);
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

    console.log("From Audio Player Pod to Play 2", podToPlay);

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
          {podToPlay[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {podToPlay[currentIndex].firstName}
          {podToPlay[currentIndex].lastName}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {podToPlay[currentIndex].description}
        </Text>
      </View>
    ) : null;
  };

  const progress = positionMillis / durationMillis;
  if (!podToPlay || podToPlay.length === 0) {
    return <ActivityIndicator />; // Render a loading indicator until data is fetched
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.albumCover}
        source={{
          uri: podToPlay[currentIndex].coverImageUrl,
        }}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={handlePreviousTrack}>
          <Ionicons name="play-skip-back" size={48} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
          {isPlaying ? (
            <Ionicons name="ios-pause" size={48} color="#444" />
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
          <Ionicons name="play-skip-forward" size={48} color="#444" />
        </TouchableOpacity>
      </View>
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
      {renderFileInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff",
  },

  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: "row",
  },
});

export default AudioPlayer;
