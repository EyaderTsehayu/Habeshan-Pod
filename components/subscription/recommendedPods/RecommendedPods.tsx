import { View, Text, TouchableOpacity, FlatList } from "react-native";
import recommendedPodStyles from "./recommendedPods.styles";
import React, { useEffect, useState } from "react";
import RecommendedPodCard from "@/components/common/cards/recommendedPod/RecommendedPodCard";
import useFirebaseData from "@/hooks/fetchData";
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDoc } from "firebase/firestore";
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
        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, userId);
        const userDocSnapshot = await getDoc(userDoc);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const subscribedPodcastCreators: string[] =
            userData.subscribedPodcastCreators || [];

          // Filter out followed podcasts from recommendations
          const filteredPods = toFollow.filter(
            (item) => !subscribedPodcastCreators.includes(item.userId)
          );

          setFiltered(filteredPods);
        }
      } catch (error) {
        console.error("Error fetching followed podcasts:", error);
      }
    };

    if (userId) {
      fetchFollowedPodcasts();
    }
  }, [toFollow, userId]);

  return (
    <View style={recommendedPodStyles.container}>
      <View style={recommendedPodStyles.cardContainer}>
        {filtered.map((item) => (
          <RecommendedPodCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default RecommendedPods;
