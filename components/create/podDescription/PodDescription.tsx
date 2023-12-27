import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import podDescStyles from "./podDesc.style";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface PodDescriptionProps {
  onPodDetailsEntered: (
    title: string,
    description: string,
    episode: string,
    genreText: string
  ) => void;
}

const PodDescription: React.FC<PodDescriptionProps> = ({
  onPodDetailsEntered,
}) => {
  const tagsArray = [
    "Technology",
    "Business",
    "Sport",
    "Self Development",
    "Entertainment",
  ];

  const [title, setTitle] = useState("");
  const [episode, setEpisode] = useState("");
  const [genreText, setGenreText] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [searchText, setSearchText] = useState<string>("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const handleInputChange = (text: string) => {
    setSearchText(text);
    // Filter tags based on input
    const filteredTags = tagsArray.filter((tag) =>
      tag.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestedTags(filteredTags);
  };
  const handleTagSelect = (tag: string) => {
    setSearchText(tag);
    setGenreText(tag);
    setSuggestedTags([]);
  };
  const handleUpload = () => {
    if (title && genreText && episode && description) {
      onPodDetailsEntered(title, genreText, episode, description);
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
          value={episode}
          onChangeText={(text) => setEpisode(text)}
          placeholder="Episode"
          placeholderTextColor={Colors.lightNavy}
        />
        <TextInput
          style={podDescStyles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Description"
          placeholderTextColor={Colors.lightNavy}
        />
        <View style={podDescStyles.genreCont}>
          <TextInput
            style={podDescStyles.inputGenre}
            placeholder="Search genres ..."
            value={searchText}
            onChangeText={handleInputChange}
            placeholderTextColor={Colors.lightNavy}
          />
          <FlatList
            data={suggestedTags}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleTagSelect(item)}>
                <Text style={podDescStyles.tag}>{item}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

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
