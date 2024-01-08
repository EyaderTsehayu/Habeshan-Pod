import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const recommendedPodStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: Colors.lightBg1,
  },

  //Trending card

  cardContainer: {
    paddingTop: 8,
    paddingBottom: 240,
    rowGap: 18,
  },
  noPodsContainer: {
    paddingTop: 40,
    paddingBottom: 180,
  },
  noPodsTxt: {
    fontFamily: "dm-b",
    color: Colors.lightNavy,
    fontSize: 26,
    textAlign: "center",
  },
});

export default recommendedPodStyles;
