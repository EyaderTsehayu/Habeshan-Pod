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
import { useEffect, useState, useRef } from "react";
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

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

  const [image, setImage] = useState();
  const [audio, setAudio] = useState();
  const [podcastDetails, setPodcastDetails] = useState({
    title: "",
    genre: "",
    episode: "",
    description: "",
  });

  const [resetVisuals, setResetVisuals] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const resetFilePickerVisuals = () => {
    setResetVisuals(!resetVisuals); // Toggle the state to trigger resetVisuals in FilePicker
  };
  const handleFilePicked = (name, size) => {
    setAudio(name);
  };
  const handleImagePicked = (pickedImage) => {
    setImage(pickedImage);
  };

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  async function schedulePushNotification(title, episode) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've posted new podcast! 📬",
        body: `you have posted ${title} episode ${episode} successfully.`,
        data: {
          data: "goes here",
        },
      },
      trigger: { seconds: 1 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "your-project-id",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const handlePodDetailsEntered = async (
    title,
    genre,
    episode,
    description
  ) => {
    setPodcastDetails({ title, genre, episode, description });
    // console.log("Log from the main page");

    // console.log("Title:", title);
    // console.log("Genre:", genre);
    // console.log("Episode:", episode);
    // console.log("Image:", image);
    // console.log("File Name:", audio);
    const storage = getStorage();
    if (image && audio) {
      setIsUploading(true);

      try {
        const storageRef = ref(storage);

        // Function to convert data URL to Blob
        const dataURLToBlob = async (dataURL) => {
          const response = await fetch(dataURL);
          const blob = await response.blob();
          return blob;
        };

        // Convert data URLs to Blobs
        const coverImageBlob = await dataURLToBlob(image);
        const audioBlob = await dataURLToBlob(audio);

        // Upload cover image
        const coverImageRef = ref(
          storage,
          `podcasts/${title}-${episode}/coverImage.jpg`
        );
        await uploadBytes(coverImageRef, coverImageBlob);

        // Upload audio file
        const audioRef = ref(storage, `podcasts/${title}-${episode}/audio.mp3`);
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
        setImage(null);
        setAudio(null);
        setIsUploading(false);
        console.log("uploaded succesfully");
        await schedulePushNotification(title, episode);
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
              resetVisuals={resetFilePickerVisuals}
              isUploading={isUploading}
              //    resetFields={resetFilePickerFields}
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
