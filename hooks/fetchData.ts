import { useState, useEffect } from "react";
import { storage, db } from "../firebaseConfig";
import {
  collection,
  QuerySnapshot,
  DocumentData,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
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

const useFirebaseData = () => {
  const [myPodData, setMyPodData] = useState<Podcast[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [trendingPodData, setTrendingPodData] = useState<Podcast[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const fetchPodcasts = () => {
      try {
        const podcastCollection = collection(db, "podcasts");
        const unsubscribe = onSnapshot(podcastCollection, (snapshot) => {
          const fetchedPodcasts: Podcast[] = [];
          snapshot.forEach((doc) => {
            const podcastData = doc.data() as Podcast;
            fetchedPodcasts.push({ ...podcastData, id: doc.id });
          });
          setPodcasts(fetchedPodcasts);
        });

        // Return a cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    const filteredMyPodData = podcasts.filter(
      (item) => item.userId === user?.id
    );
    setMyPodData(filteredMyPodData);
  }, [podcasts]);

  useEffect(() => {
    const filteredMyPodData = podcasts.filter(
      (item) => item.userId === user?.id
    );
    setMyPodData(filteredMyPodData);
  }, [podcasts]);

  useEffect(() => {
    const filteredArray = podcasts
      .slice(Math.max(podcasts.length - 5, 0))
      .reverse();

    setTrendingPodData(filteredArray);
  }, [podcasts]);

  return { podcasts, myPodData, trendingPodData };
};

export default useFirebaseData;
