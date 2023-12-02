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
    rowGap: 18,
  },
});

export default recommendedPodStyles;
