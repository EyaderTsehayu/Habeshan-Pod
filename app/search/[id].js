import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import useFirebaseData from "@/hooks/fetchData";
import MyPodCard from "@/components/common/cards/myPod/MyPodCard";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const PodSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { podcasts } = useFirebaseData();
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  //const params = useLocalSearchParams();

  const handleSearch = () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const filteredPodcasts = podcasts.filter((item) => {
        return item.title.toLowerCase().includes(params.id.toLowerCase());
      });
      setSearchResult(filteredPodcasts);
      console.log("filtered pods", filteredPodcasts);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      if (searchResult.length >= 4 * page) {
        setPage(page + 1);
        handleSearch();
      }
    }
  };

  useEffect(() => {
    console.log(params.id);
    console.log(podcasts);
    handleSearch();
  }, [podcasts]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightBg1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.lightBg1 },
          headerShadowVisible: false,
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
          headerTitle: "",
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item, index }) => (
          <MyPodCard
            key={index}
            item={item}
            index={index}
            podcasts={podcasts}
            //handleNavigate={() => router.push(`/pod-details/${item}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 14, rowGap: 14 }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>
                <Text style={{ fontSize: 38 }}>Results for</Text>
                <Text style={{ fontSize: 40 }}> "{params.id}" </Text>
              </Text>
              <Text style={styles.noOfSearchedJobs}>
                Filtered Podcasts - {searchResult.length}
              </Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <MaterialIcons
                name="navigate-before"
                size={24}
                color={Colors.headerText}
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <MaterialIcons
                name="navigate-next"
                size={24}
                color={Colors.headerText}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchTitle: {
    fontFamily: "dm-b",
    color: Colors.headerText,
    paddingLeft: 8,
  },
  noOfSearchedJobs: {
    marginTop: 2,
    paddingLeft: 8,

    fontFamily: "dm-sb",
    fontSize: 24,
    color: Colors.lightNavy,
  },
  loaderContainer: {
    marginTop: 12,
  },
  footerContainer: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  paginationButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  paginationImage: {
    width: "60%",
    height: "60%",
    tintColor: Colors.lightBg1,
  },
  paginationTextBox: {
    width: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBg1,
  },
  paginationText: {
    fontFamily: "dm-b",
    fontSize: 18,
    color: Colors.lightNavy,
  },
});
export default PodSearch;
