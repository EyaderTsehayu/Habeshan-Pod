import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import FilePicker from "@/components/create/filePicker/FilePicker";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PodDescription from "@/components/create/podDescription/PodDescription";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { db } from "@/firebaseConfig";

const Page = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  let userId = "";
  let firstName = "";
  let lastName = "";
  if (isSignedIn) {
    if (user?.id && user?.firstName && user?.lastName) {
      userId = user.id;
      firstName = user?.firstName;
      lastName = user?.lastName;
    } else {
      console.log("User not available");
    }
  }

  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [podcastDetails, setPodcastDetails] = useState({
    title: "",
    genre: "",
    episode: "",
    description: "",
  });

  const handleFilePicked = (name: string | null, size: number | null) => {
    setAudio(name);
  };
  const handleImagePicked = (pickedImage: string | null) => {
    setImage(pickedImage);
  };

  const handlePodDetailsEntered = async (
    title: string,
    genre: string,
    episode: string,
    description: string
  ) => {
    setPodcastDetails({ title, genre, episode, description });
    console.log("Log from the main page");

    console.log("Title:", title);
    console.log("Genre:", genre);
    console.log("Episode:", episode);
    console.log("Image:", image);
    console.log("File Name:", audio);
    const storage = getStorage();
    if (image && audio) {
      try {
        const storageRef = ref(storage);

        // Function to convert data URL to Blob
        const dataURLToBlob = async (dataURL: any) => {
          const response = await fetch(dataURL);
          const blob = await response.blob();
          return blob;
        };

        // Convert data URLs to Blobs
        const coverImageBlob = await dataURLToBlob(image);
        const audioBlob = await dataURLToBlob(audio);

        // Upload cover image
        const coverImageRef = ref(storage, `podcasts/${title}/coverImage.jpg`);
        await uploadBytes(coverImageRef, coverImageBlob);

        // Upload audio file
        const audioRef = ref(storage, `podcasts/${title}/audio.mp3`);
        await uploadBytes(audioRef, audioBlob);

        // Get download URLs for the uploaded files
        const coverImageUrl = await getDownloadURL(coverImageRef);
        const audioUrl = await getDownloadURL(audioRef);

        // Store podcast details in Firestore
        await addDoc(collection(db, "podcasts"), {
          userId,
          firstName,
          lastName,
          title,
          episode,
          description,
          genre,
          coverImageUrl,
          audioUrl,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        // Handle any errors here
        console.error("Error:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightBg }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: Colors.lightBg },
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 24, marginTop: 12 }}
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
              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    marginTop: 12,
                    flexDirection: "row",
                    columnGap: 12,
                  }}
                >
                  {/* <Entypo name="upload" size={24} color={Colors.headerText} /> */}
                  <Text style={styles.headerTxt}>Create pods</Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <View style={styles.container}>
          <View style={styles.filePickerContainer}>
            <FilePicker
              onFilePicked={handleFilePicked}
              onImagePicked={handleImagePicked}
            />
          </View>
          <PodDescription onPodDetailsEntered={handlePodDetailsEntered} />
        </View>
        {/* ... (existing code remains the same) */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    // marginTop: 3,
  },
  headerTxt: {
    fontFamily: "dm-b",
    fontSize: 24,
    color: Colors.headerText,
  },
  uploadContainer: {
    //padding: 20,
    marginRight: 24,
  },
  filePickerContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
