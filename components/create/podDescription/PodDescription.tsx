import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import podDescStyles from "./podDesc.style";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface PodDescriptionProps {
  onPodDetailsEntered: (
    title: string,
    description: string,
    episode: string
  ) => void;
}

const PodDescription: React.FC<PodDescriptionProps> = ({
  onPodDetailsEntered,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [episode, setEpisode] = useState("");

  const handleUpload = () => {
    if (title && description && episode) {
      onPodDetailsEntered(title, description, episode);
    } else {
      alert("Please fill all fields");
    }
  };
  return (
    <View style={podDescStyles.container}>
      <View style={podDescStyles.inputWrapper}>
        <TextInput
          style={podDescStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholderTextColor={Colors.lightNavy}
          placeholder="Podcast Title"
        />
        <TextInput
          style={podDescStyles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholderTextColor={Colors.lightNavy}
          placeholder="Description"
        />
        <TextInput
          style={podDescStyles.input}
          value={episode}
          onChangeText={(text) => setEpisode(text)}
          placeholder="Episode"
          placeholderTextColor={Colors.lightNavy}
        />

        <TouchableOpacity
          style={podDescStyles.uploadBtn}
          onPress={handleUpload}
        >
          <Feather name="upload-cloud" size={26} color={Colors.lightBg1} />
          <Text style={podDescStyles.btnText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PodDescription;
