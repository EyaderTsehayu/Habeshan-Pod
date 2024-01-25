import { View, Text, TouchableOpacity, FlatList } from "react-native";
import recommendedPodStyles from "./recommendedPods.styles";
import React, { useEffect, useState } from "react";
import RecommendedPodCard from "@/components/common/cards/recommendedPod/RecommendedPodCard";
import useFirebaseData from "@/hooks/fetchData";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
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
const RecommendedPods = () => {
  const [filtered, setFiltered] = useState<Podcast[]>([]);

  const { toFollow } = useFirebaseData();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchFollowedPodcasts = async () => {
      try {
        const q = query(collection(db, "users"), where("userId", "==", userId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Access the user data from the document
            const userData = doc.data();

            // Accessing the array
            const subscribedPodcastCreators =
              userData.subscribedPodcastCreators;
            // Filtering the toFollow array based on the condition
            const filteredPods = toFollow.filter((item) => {
              // Checking if item.userId is not equal to any creatorId
              return !subscribedPodcastCreators.includes(item.userId);
            });

            setFiltered(filteredPods);
          });
        });
      } catch (error) {
        console.error("Error fetching followed podcasts:", error);
      }
    };

    fetchFollowedPodcasts();
  }, [toFollow, userId]);

  return (
    <View style={recommendedPodStyles.container}>
      {filtered && filtered.length > 0 ? (
        <View style={recommendedPodStyles.cardContainer}>
          {filtered.map((item) => (
            <RecommendedPodCard key={item.id} item={item} />
          ))}
        </View>
      ) : (
        <View style={recommendedPodStyles.noPodsContainer}>
          <Text style={recommendedPodStyles.noPodsTxt}>
            No Recommended pods For You Yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecommendedPods;
