import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import useFirebaseData from "@/hooks/fetchData";
import SearchedPodCard from "@/components/common/cards/search/SearchedPodCard";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RelatedPodCard from "../../components/common/cards/related/RelatedPodCard";

const PodDetails = () => {
  const params = useLocalSearchParams();

  const router = useRouter();
  const { podcasts } = useFirebaseData();
  const [searchResult, setSearchResult] = useState([]);
  const [searchRelated, setSearchRelated] = useState([]);
  const index = podcasts.findIndex((podcast) => podcast.id === params.id);

  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  const handleSearch = useCallback(() => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const filteredPodcasts = podcasts.filter((item) => item.id === params.id);
      setSearchResult(filteredPodcasts);
      // console.log("filtered pods from details", filteredPodcasts);

      if (filteredPodcasts.length > 0) {
        filterRelated(filteredPodcasts[0].genre, params.id);
      }
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  }, [params.id, podcasts]);

  const filterRelated = (genre, id) => {
    const filteredPodcasts = podcasts.filter(
      (item) => item.genre === genre && item.id !== id
    );
    //console.log("Related Pods", filteredPodcasts);
    setSearchRelated(filteredPodcasts);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
  const handlePodcastPress = () => {
    router.push({
      pathname: "/pod-player/player",
      params: { index: index, data: "searchedPod" },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightBg1 }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        {searchResult.length > 0 && (
          <>
            <ImageBackground
              source={{ uri: searchResult[0].coverImageUrl }}
              style={styles.image}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{searchResult[0].title}</Text>

                <Text style={styles.episodeText}>
                  Episode - {searchResult[0].episode}
                </Text>
                <Text style={styles.creatorText}>
                  {searchResult[0].firstName} {searchResult[0].lastName}
                </Text>
              </View>
            </ImageBackground>
            <View style={styles.actionCont}>
              <View style={styles.actionContmain}>
                <TouchableOpacity
                  style={styles.play}
                  onPress={handlePodcastPress}
                >
                  <Ionicons
                    name="ios-play-circle"
                    size={36}
                    color={Colors.lightNavy}
                  />
                  <Text style={styles.playTxt}>Play Podcast</Text>
                </TouchableOpacity>

                <View style={styles.sharePlayCont}>
                  <TouchableOpacity style={styles.share}>
                    <Ionicons
                      name="ios-heart-outline"
                      size={30}
                      color={Colors.headerText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.like}>
                    <Ionicons
                      name="ios-share-social"
                      size={30}
                      color={Colors.headerText}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.genreCont}>
                <Text style={styles.aboutDesc}>Genre</Text>
                <Text style={styles.desctext}>{searchResult[0].genre}</Text>
              </View>
              <View style={styles.aboutCont}>
                <Text style={styles.aboutDesc}>About this podcast</Text>
                <Text style={styles.desctext}>
                  {searchResult[0].description}
                </Text>
              </View>
              <View style={styles.relatedCont}>
                <Text style={styles.relatedDesc}>Related podcasts</Text>
                {searchRelated && searchRelated.length > 0 ? (
                  <FlatList
                    data={searchRelated}
                    renderItem={({ item }) => <RelatedPodCard item={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    contentContainerStyle={{ columnGap: 25 }}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <Text style={styles.noRelatedDesc}>
                    No related podcasts found
                  </Text>
                )}
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Other styles for your container view if needed
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    // height: "60%",
    alignItems: "center",
  },
  titleContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 44,
    paddingTop: 12,
    display: "flex",
    position: "absolute",
    bottom: 0,
    width: "90%",
    alignItems: "center",
    backgroundColor: Colors.cardBg,
  },
  titleText: {
    fontFamily: "dm-b",
    fontSize: 38,
    color: Colors.headerText,
    textAlign: "center",
  },
  episodeText: {
    fontFamily: "dm-sb",
    fontSize: 24,
    color: Colors.headerText,
    textAlign: "center",
  },
  creatorText: {
    paddingVertical: 10,
    fontFamily: "dm",
    fontSize: 18,
    color: Colors.headerText,
    textAlign: "center",
  },
  actionCont: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 22,
  },
  actionContmain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sharePlayCont: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  play: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  playTxt: {
    fontFamily: "dm-b",
    fontSize: 20,
    color: Colors.lightNavy,
  },
  share: {},
  like: {},
  genreCont: {
    paddingTop: 10,
  },
  aboutCont: {
    paddingTop: 6,
  },
  relatedCont: {
    paddingVertical: 8,
  },
  relatedDesc: {
    paddingTop: 6,
    paddingBottom: 12,
    fontFamily: "dm-b",
    fontSize: 20,
    color: Colors.headerText,
  },
  aboutDesc: { fontFamily: "dm-b", fontSize: 20, color: Colors.headerText },
  //paddingTop: 20,
  desctext: {
    paddingTop: 4,
    fontFamily: "dm",
    fontSize: 18,
    color: Colors.headerText,
  },
  noRelatedDesc: {
    textAlign: "center",
    paddingTop: 26,
    paddingBottom: 12,
    fontFamily: "dm-b",
    fontSize: 24,
    color: Colors.headerText,
  },
});

export default PodDetails;
