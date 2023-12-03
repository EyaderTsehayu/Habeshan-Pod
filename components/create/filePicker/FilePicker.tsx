import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import filePickerStyles from "./filePicker.style";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const FilePicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["audio/mpeg"],
    });

    console.log(result);
    if (!result.canceled && result.assets.length > 0) {
      setName(result.assets[0].name);
      // Check if size exists before setting the state
      if (result.assets[0].size !== undefined) {
        setSize(result.assets[0].size);
      } else {
        setSize(null); // or a default value depending on your logic
      }
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    delete (result as any).cancelled;
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={filePickerStyles.container}>
      <View style={filePickerStyles.imagePickerCont}>
        <TouchableOpacity onPress={pickImage}>
          {!image ? (
            <View
              style={{ display: "flex", flexDirection: "row", columnGap: 3 }}
            >
              <Image
                source={require("../../../assets/images/gallery.png")}
                style={filePickerStyles.galleryImg}
              />

              <View style={filePickerStyles.imagePickerMsgCont}>
                <Text style={filePickerStyles.imagePickerMsgHeader}>
                  Choose Podcast Cover
                </Text>
                <Text style={filePickerStyles.imagePickerMsgSubtext}>
                  Format JPG,PNG,JPEG{" "}
                </Text>
              </View>
            </View>
          ) : (
            <View style={filePickerStyles.imageView}>
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={{
                  width: 500,
                  height: 150,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={filePickerStyles.audioPickerCont}>
        <TouchableOpacity onPress={pickAudio}>
          {!name ? (
            <View style={filePickerStyles.audioPickerMsgCont}>
              <View>
                <Text style={filePickerStyles.imagePickerMsgHeader}>
                  Choose Your Podcast
                </Text>
                <Text style={filePickerStyles.audioPickerMsgSubtext}>
                  {" "}
                  Format mp3, mp4, aac{" "}
                </Text>
              </View>
              <Image
                source={require("../../../assets/images/podcast-mic.png")}
                style={filePickerStyles.podImg}
              />
            </View>
          ) : (
            <View style={filePickerStyles.docView}>
              <View
                style={{ display: "flex", flexDirection: "row", columnGap: 12 }}
              >
                <Entypo name="modern-mic" size={44} color={Colors.lightNavy} />
                <Text style={filePickerStyles.imagePickerMsgHeader}>
                  Podcast details
                </Text>
              </View>

              <View>
                <Text style={{ fontFamily: "dm-sb", color: "#713ABE" }}>
                  {name}
                </Text>
                <Text
                  style={{
                    fontFamily: "dm-sb",
                    color: "#713ABE",
                    paddingVertical: 12,
                  }}
                >
                  {size} bytes{" "}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* <Button title="Select Document" onPress={pickDocument} /> */}
    </View>
  );
};

export default FilePicker;
