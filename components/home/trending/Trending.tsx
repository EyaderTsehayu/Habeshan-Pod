import { View, Text, TouchableOpacity } from "react-native";
import trendingStyle from "./trending.style";
import React, { useEffect, useState } from "react";
import TrendingPodCard from "@/components/common/cards/trending/TrendingPodCard";
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
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

const Trending: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const podcastCollection = collection(db, "podcasts");
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          podcastCollection
        );
        console.log(querySnapshot);

        const fetchedPodcasts: Podcast[] = [];

        querySnapshot.forEach((doc) => {
          const podcastData = doc.data() as Podcast;
          fetchedPodcasts.push({ ...podcastData, id: doc.id });
        });

        setPodcasts(fetchedPodcasts);
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
        // Handle error state or display a message to the user
      }
    };

    fetchPodcasts();
  }, []);

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
      <View style={trendingStyle.cardContainer}>
        {podcasts.map((item) => (
          <TrendingPodCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default Trending;
