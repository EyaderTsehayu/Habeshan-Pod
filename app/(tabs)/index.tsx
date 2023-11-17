import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Welcome from "@/components/home/welcome/Welcome";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Popular from "@/components/home/popular/Popular";
import Trending from "@/components/home/trending/Trending";

const Page = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = () => {
    if (searchTerm) {
      router.push("/");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.primary },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <View>
        <Welcome
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={handleSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ctaContainer}>
          <View>
            <Popular />
          </View>
          <View>
            <Trending />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  ctaContainer: {
    backgroundColor: "#EEF5FF",
    borderTopLeftRadius: 30,
    overflow: "hidden",
  },
});
