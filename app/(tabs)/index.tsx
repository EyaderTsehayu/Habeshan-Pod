import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

const Page = () => {
  return (
    <View>
      <Text>Explore</Text>
      <Link href={"/(modals)/login"}>Login</Link>
    </View>
  );
};

export default Page;
