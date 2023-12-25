import { useState, useEffect } from "react";
import { storage, db } from "../firebaseConfig";
import {
  collection,
  QuerySnapshot,
  DocumentData,
  getDocs,
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
