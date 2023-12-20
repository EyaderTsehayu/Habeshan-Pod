import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MyPodList from "@/components/mypod/podList/MyPodList";

const Page = () => {
  const router = useRouter();

  return (
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
            <View style={styles.myPods}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  marginTop: 12,
                  flexDirection: "row",
                  columnGap: 12,
                }}
              >
                <Text style={styles.headerTxt}>My Podcasts</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <View style={styles.container}>
        <View style={styles.uploadInternal}>
          <View style={styles.uploadCont}>
            <View>
              <Text style={styles.uploadTxt}>New Podcast</Text>
              <Text style={styles.uploadSubText}>
                Upload your podcast on cloud and share on social
              </Text>
            </View>
            <View>
              <Image
                source={require("../../assets/images/headset.png")}
                style={styles.headsetImg}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.uploaBtn}
            onPress={() => router.push("/createPodcast")}
          >
            <Feather name="upload-cloud" size={24} color={Colors.lightBg} />
            <Text
              style={{
                color: Colors.lightBg,
                fontFamily: "dm-b",
                fontSize: 16,
              }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.MyPodListCont}>
          <MyPodList />
        </ScrollView>
      </View>
    </SafeAreaView>
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
  myPods: {
    marginRight: 24,
  },

  uploadCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  uploadSubText: {
    color: Colors.lightNavy,
    fontFamily: "dm-sb",
    paddingTop: 6,
    maxWidth: "88%",
  },
  uploadTxt: {
    color: Colors.headerText,
    fontFamily: "dm-b",
    fontSize: 32,
  },
  uploadInternal: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
  },
  uploaBtn: {
    backgroundColor: Colors.primary,
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    marginLeft: 24,
    paddingVertical: 8,
    paddingLeft: 18,
    borderRadius: 10,
    marginBottom: 12,
    width: "40%",
  },
  headsetImg: {
    height: 100,
    width: 90,
    resizeMode: "contain",
  },
  MyPodListCont: {
    marginTop: 36,
    borderTopWidth: 3,
    borderTopColor: Colors.cardBg,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});
