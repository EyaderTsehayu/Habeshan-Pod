import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import FollowingCard from "@/components/common/cards/following/FollowingCard";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface User {
  email: string;
  firstName: string;
  subscribedPodcastCreators: string[];
}

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
  // Add other podcast fields as needed
}

const PodcastApp: React.FC = () => {
  const [userData, setUser] = useState<User | null>(null);
  const [followedPodcasts, setFollowedPodcasts] = useState<Podcast[]>([]);
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  // Fetch user data including subscribedPodcastCreators
  useEffect(() => {
    const loggedUser = userId;
    const userCollection = collection(db, "users");
    const userQuery = query(userCollection, where("userId", "==", loggedUser));

    const unsubscribe = async () => {
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.docs.length > 0) {
        const userData = userSnapshot.docs[0].data() as User;
        setUser(userData);

        // Fetch podcasts for subscribed creators
        fetchFollowedPodcasts(userData.subscribedPodcastCreators);
      }
    };

    unsubscribe();

    return () => {
      /* cleanup logic if needed */
    };
  }, []);

  // Fetch podcasts for subscribed creators
  const fetchFollowedPodcasts = async (subscribedPodcastCreators: string[]) => {
    try {
      const podcastsPromises = subscribedPodcastCreators.map(
        async (creatorId) => {
          const podcastCollection = collection(db, "podcasts");
          const podcastQuery = query(
            podcastCollection,
            where("userId", "==", creatorId)
          );
          const podcastSnapshot = await getDocs(podcastQuery);

          if (!podcastSnapshot.empty) {
            const podcastData = podcastSnapshot.docs[0].data() as Podcast;
            //  console.log("Fetched Podcast:", podcastData);
            return podcastData;
          }
          return null;
        }
      );

      const podcasts = await Promise.all(podcastsPromises);
      setFollowedPodcasts(
        podcasts.filter((podcast) => podcast !== null) as Podcast[]
      );
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightBg }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.lightBg },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 6, marginTop: 12 }}
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
            <View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  marginTop: 12,
                  flexDirection: "row",
                  columnGap: 12,
                }}
              >
                <Text
                  style={{
                    color: Colors.headerText,
                    marginVertical: 12,
                    marginHorizontal: 14,
                    alignItems: "center",
                    fontFamily: "dm-b",
                    fontSize: 24,
                  }}
                >
                  Following list
                </Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <View>
        <View>
          {!userData ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text
                style={{
                  color: Colors.headerText,
                  marginVertical: 12,
                  marginHorizontal: 14,
                  alignItems: "center",
                  fontFamily: "dm-b",
                  fontSize: 28,
                }}
              >
                My Subscriptions
              </Text>
              {followedPodcasts.map((podcast) => (
                <FollowingCard key={podcast.id} item={podcast} />
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PodcastApp;
