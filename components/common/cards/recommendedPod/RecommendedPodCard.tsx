import { View, Text, Image, TouchableOpacity } from "react-native";
import recommendedPodCardStyles from "./recommendedPodCard.style";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { db } from "@/firebaseConfig";
import {
  collection,
  QuerySnapshot,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDoc,
  increment,
  FieldValue,
  doc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
interface Item {
  id: string;
  title: string;
  // creator: string;
  coverImageUrl: string;
  userId: string;
  // followers: number;
  // podcasts: number;
  // likes: number;
}
interface Users {
  id: string;
  firstName: string;
  lastName: string;
  userId: string;
  followers: number;
  // likes: number;
}
const RecommendedPodCard = ({ item }: { item: Item }) => {
  const [userDetails, setUserDetails] = useState<Users[]>([]);
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    const fetchPodcasts = async () => {
      // console.log("item in fetch id", item.userId);

      try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("userId", "==", item.userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedUser: Users[] = [];
          snapshot.forEach((doc) => {
            const podcastData = doc.data() as Users;
            fetchedUser.push({ ...podcastData, id: doc.id });
          });

          console.log("fetchedUser in recommended", fetchedUser);

          setUserDetails(fetchedUser);
        });

        return () => {
          // Unsubscribe from the snapshot listener when component unmounts
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, [item.userId]);

  const followPodcast = async () => {
    console.log("clicked follow", item.userId);

    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("userId", "==", userId));

    try {
      const snapshot = await getDocs(userQuery);
      snapshot.forEach(async (doc) => {
        const userData = doc.data();
        const subscribedPodcastCreators =
          userData.subscribedPodcastCreators || [];
        const userRef = doc.ref;

        if (!subscribedPodcastCreators.includes(item.userId)) {
          subscribedPodcastCreators.push(item.userId);
          const updatedData = { subscribedPodcastCreators };

          try {
            await updateDoc(userRef, updatedData);
            console.log("followed successfully");
            await incrementFollowerCount(item.userId);
          } catch (error) {
            // Handle update error
            console.error("Error updating document:", error);
          }
        } else {
          // User is already following this podcast
          // Handle the case when the user is already subscribed
        }
      });
    } catch (error) {
      // Handle query error
      console.error("Error fetching document:", error);
    }
  };
  async function incrementFollowerCount(userIdToMatch: string) {
    const userCollection = collection(db, "users");
    const userQuery = query(
      userCollection,
      where("userId", "==", userIdToMatch)
    );

    try {
      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs[0];

      if (userDoc) {
        const user = userDoc.data();
        const newFollowerCount = user.followers + 1;
        const updatedData = { followers: newFollowerCount };

        try {
          await updateDoc(userDoc.ref, updatedData);
          console.log("Follower count updated successfully.");
        } catch (error) {
          console.error("Error updating follower count:", error);
        }
      } else {
        console.error("User not found with userId:", userIdToMatch);
      }
    } catch (error) {
      // Handle query error
      console.error("Error fetching document:", error);
    }
  }
  return (
    <TouchableOpacity style={recommendedPodCardStyles.container}>
      <View style={recommendedPodCardStyles.description}>
        <Image
          style={recommendedPodCardStyles.cover}
          source={{ uri: item.coverImageUrl }}
        />
        <View style={recommendedPodCardStyles.detailsContainer}>
          <Text style={recommendedPodCardStyles.title}>{item.title}</Text>
          {userDetails && userDetails.length > 0 ? (
            <View style={recommendedPodCardStyles.creator}>
              <View style={recommendedPodCardStyles.iconTextContainer}>
                <SimpleLineIcons
                  name="user-following"
                  size={14}
                  color={Colors.headerText}
                />
                <Text>
                  {userDetails[0].followers}
                  &nbsp;
                  {userDetails[0].followers > 1 ? "followers" : "follower"}
                </Text>
              </View>
              {/* <View style={recommendedPodCardStyles.iconTextContainer}>
              <AntDesign
                name="sound"
                size={16}
                color={Colors.headerText} // Set your color here
              />
              <Text>{item.podcasts}</Text>
            </View>
            <View style={recommendedPodCardStyles.iconTextContainer}>
              <AntDesign
                name="like2"
                size={16}
                color={Colors.headerText} // Set your color here
              />
              <Text>{item.likes}</Text>
            </View> */}
            </View>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={recommendedPodCardStyles.followBtn}
            onPress={followPodcast}
          >
            <Text style={recommendedPodCardStyles.followBtnTxt}> Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedPodCard;
