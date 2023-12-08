import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import filePickerStyles from "./filePicker.style";

interface FilePickerProps {
  onFilePicked: (name: string | null, size: number | null) => void;
  onImagePicked: (image: string | null) => void; // New prop for image picking
}

const FilePicker: React.FC<FilePickerProps> = ({
  onFilePicked,
  onImagePicked,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["audio/mpeg"],
    });

    console.log("result from file picker", result);

    if (!result.canceled && result.assets.length > 0) {
      setName(result.assets[0].name);

      setSize(result.assets[0].size ?? null); // Update this line
      onFilePicked(result.assets[0].uri, result.assets[0].size ?? null);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    delete (result as any).canceled;
    if (!result.canceled) {
      console.log("From File Picker", result.assets[0].uri);
      setImage(result.assets[0].uri);
      onImagePicked(result.assets[0].uri); // Pass the image URI here
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
                  width: 170,
                  height: 140,
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
