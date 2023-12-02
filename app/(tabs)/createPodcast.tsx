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
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import FilePicker from "@/components/create/filePicker/FilePicker";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PodDescription from "@/components/create/podDescription/PodDescription";
//import React, { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";

const Page = () => {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }} // Set flex: 1 to cover the entire screen
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior for iOS/Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100} // Adjust offset for iOS/Android
    >
      <SafeAreaView style={styles.container}>
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
                  <Text style={styles.headerTxt}>Add Files</Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        <View style={styles.container}>
          <View style={styles.filePickerContainer}>
            <FilePicker />
          </View>

          <PodDescription />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    marginTop: 3,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
