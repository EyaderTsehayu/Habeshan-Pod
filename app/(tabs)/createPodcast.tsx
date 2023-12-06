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

const Page = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [podcastDetails, setPodcastDetails] = useState({
    title: "",
    description: "",
    episode: "",
  });

  const handleFilePicked = (name: string | null, size: number | null) => {
    setFileName(name);
    setFileSize(size);
  };
  const handleImagePicked = (pickedImage: string | null) => {
    setImage(pickedImage);
  };

  const handlePodDetailsEntered = (
    title: string,
    description: string,
    episode: string
  ) => {
    setPodcastDetails({ title, description, episode });
    console.log("Log from the main page");

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Episode:", episode);
    console.log("Image:", image);
    console.log("File Name:", fileName);
    console.log("File Size:", fileSize);

    // Here, you can send all the collected data (image, fileName, fileSize, and podcastDetails) to your database or perform further actions.
    // Example:
    // sendDataToDatabase(image, fileName, fileSize, podcastDetails);
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
