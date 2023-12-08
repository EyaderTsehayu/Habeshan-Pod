import { View, Text, TouchableOpacity } from "react-native";
import myPodListstyles from "./myPodList.styles";
import React, { useEffect, useState } from "react";
import MyPodCard from "@/components/common/cards/myPod/MyPodCard";
import { Image } from "react-native";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";

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
const MyPodList = () => {
  const { user } = useUser();

  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const q = query(
          collection(db, "podcasts"),
          where("userId", "==", user?.id)
        );

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

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

  if (podcasts.length > 0) {
    return (
      <View style={myPodListstyles.container}>
        <View style={myPodListstyles.headerContainer}>
          <Text style={myPodListstyles.headerTitle}>My Tracks</Text>
        </View>
        <View style={myPodListstyles.cardContainer}>
          {podcasts.map((item) => (
            <MyPodCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={myPodListstyles.noPodcastTxt}>
          You have not posted a podacast yet.
        </Text>
        <Image
          source={require("../../../assets/images/nopost.png")}
          style={myPodListstyles.noPostImg}
        />
      </View>
    );
  }
};

export default MyPodList;
