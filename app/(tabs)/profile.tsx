import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#F3F4F8", "#D4A9F5"]}
        start={[1, 0.5]}
        end={[1, 1]}
        locations={[0, 1]}
        style={styles.linear}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Ionicons
            name="notifications-outline"
            size={26}
            color={Colors.headerText}
          />
        </View>

        {user && (
          <View style={styles.card}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 6 }}>
              {!edit && (
                <View style={styles.editRow}>
                  <Text
                    style={{
                      fontFamily: "dm-b",
                      fontSize: 28,
                      color: Colors.headerText,
                    }}
                  >
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons
                      name="create-outline"
                      size={26}
                      color={Colors.headerText}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {edit && (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="First Name"
                    value={firstName || ""}
                    onChangeText={setFirstName}
                    style={[styles.inputField, { width: 120 }]} //change style
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastName || ""}
                    onChangeText={setLastName}
                    style={[styles.inputField, { width: 120 }]}
                  />
                  <TouchableOpacity onPress={onSaveUser}>
                    <Ionicons
                      name="checkmark-outline"
                      size={24}
                      color={Colors.headerText}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: "dm-b",
                color: Colors.lightNavy,
                fontSize: 16,
              }}
            >
              {email}
            </Text>
            <Text
              style={{
                fontFamily: "dm-b",
                color: Colors.lightNavy,
                fontSize: 14,
              }}
            >
              Since {user?.createdAt!.toLocaleDateString()}
            </Text>
          </View>
        )}
        <View style={styles.detailCont}>
          <View style={styles.detailTxt}>
            <Text style={styles.detailTxtNo}>556</Text>
            <Text style={styles.detailTxtDesc}>Followers</Text>
          </View>
          <View style={styles.detailTxt1}>
            <Text style={styles.detailTxtNo}>72</Text>
            <Text style={styles.detailTxtDesc}>Podcasts</Text>
          </View>
          <View style={styles.detailTxt2}>
            <Text style={styles.detailTxtNo}>1756</Text>
            <Text style={styles.detailTxtDesc}>Likes</Text>
          </View>
        </View>

        {isSignedIn && (
          <View style={styles.btnCont}>
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => signOut()}
            >
              <SimpleLineIcons
                name="logout"
                size={22}
                color={Colors.headerText}
              />
              <Text style={styles.btnTxt}> Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
        {!isSignedIn && (
          <Link href={"/(modals)/login"} asChild>
            <Button title="Log In" color={Colors.headerText} />
          </Link>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg1, //"#FDFFFF",
    //padding: 26,
  },
  linear: {
    flex: 1,
    resizeMode: "contain",
    padding: 26,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    fontFamily: "dm-b",
    color: Colors.headerText,
    fontSize: 24,
  },
  card: {
    paddingHorizontal: 24,
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightNavy,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightNavy,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  detailCont: {
    display: "flex",
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  detailTxt: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    borderRightWidth: 1.5,
    borderRightColor: Colors.lightNavy,
    paddingRight: 16,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailTxt1: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  detailTxt2: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    borderLeftWidth: 1.5,
    borderLeftColor: Colors.lightNavy,
    paddingLeft: 16,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  detailTxtNo: {
    fontFamily: "dm-b",
    fontSize: 24,
    color: Colors.lightNavy,
  },
  detailTxtDesc: {
    fontFamily: "dm-sb",
    fontSize: 18,
    color: Colors.headerText,
  },

  btnCont: { margin: 22, alignItems: "center" },
  logOutBtn: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    borderWidth: 1.5,
    borderColor: Colors.headerText,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnTxt: {
    fontFamily: "dm-sb",
    color: Colors.headerText,
    fontSize: 20,
  },
  inputField: {
    //height: 44,
    borderWidth: 1,
    borderColor: Colors.lightNavy,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: Colors.headerText,
    backgroundColor: "#fff",
    fontSize: 18,
  },
});

export default Page;
