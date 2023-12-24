import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import commentStyles from "./comment.style";
import { Feather } from "@expo/vector-icons";
import {
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface PodcastDetailsProps {
  podcastId: string;
}

interface Comment {
  userId: string;
  comment: string;
  createdAt: any;
}
const CommentSheet: React.FC<PodcastDetailsProps> = ({ podcastId }) => {
  const { user } = useUser();
  const userId = user?.id;

  const translateY = useSharedValue(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = async () => {
    if (commentText.trim() === "") {
      return;
    }

    try {
      const podcastRef = doc(db, "podcasts", podcastId);

      const commentData = {
        userId,
        comment: commentText,
        createdAt: Timestamp.now(),
      };

      await updateDoc(podcastRef, {
        comments: arrayUnion(commentData),
      });
      fetchComments();
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const podcastRef = doc(db, "podcasts", podcastId);
      const podcastSnap = await getDoc(podcastRef);

      if (podcastSnap.exists()) {
        const podcastData = podcastSnap.data();
        if (podcastData && podcastData.comments) {
          setComments(podcastData.comments);
        }
      } else {
        setComments([]);
      }
    } catch (error) {
      setComments([]);
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [podcastId]);

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);
  const handleInputFocus = () => {
    scrollTo(-SCREEN_HEIGHT / 1.5);
  };
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(-SCREEN_HEIGHT / 2.3);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });
  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 2.3);
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        <View style={commentStyles.addCommentContainer}>
          <View style={commentStyles.addCommentWrapper}>
            <TextInput
              style={commentStyles.addCommentInput}
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
              placeholder="Add a comment ..."
              placeholderTextColor={Colors.lightNavy}
              onFocus={handleInputFocus}
            />
            <TouchableOpacity
              style={commentStyles.addCommentBtn}
              onPress={handleAddComment}
            >
              <Feather name="send" size={24} color={Colors.headerText} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={comments}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.comment}</Text>
              </View>
            )}
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: Colors.lightBg,
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 30,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: Colors.lightNavy,
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
export default CommentSheet;
