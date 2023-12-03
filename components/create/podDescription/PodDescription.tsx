import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import podDescStyles from "./podDesc.style";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const PodDescription = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={podDescStyles.container}>
      <View style={podDescStyles.inputWrapper}>
        <TextInput
          style={podDescStyles.input}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          placeholderTextColor={Colors.lightNavy}
          placeholder="Podcast Title"
        />
        <TextInput
          style={podDescStyles.input}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          placeholderTextColor={Colors.lightNavy}
          placeholder="Description"
        />
        <TextInput
          style={podDescStyles.input}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          placeholder="Episode"
          placeholderTextColor={Colors.lightNavy}
        />
        <TouchableOpacity style={podDescStyles.uploadBtn}>
          <Feather name="upload-cloud" size={26} color={Colors.lightBg1} />
          <Text style={podDescStyles.btnText}>Upload</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>Hello</Text> */}
    </View>
  );
};

export default PodDescription;
