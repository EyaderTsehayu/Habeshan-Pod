import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const trendingCardStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    //marginTop: 20,
    padding: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "Space-between",
    gap: 20,
    padding: 2,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "Space-between",
  },
  cover: {
    resizeMode: "contain",
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  title: {
    fontFamily: "dm-b",
    fontSize: 22,
    color: Colors.headerText,
  },
  episode: {
    fontFamily: "dm-sb",
    fontSize: 16,
    paddingTop: 6,
    color: Colors.headerText,
  },
  creator: {
    fontFamily: "dm",
    fontSize: 16,
    paddingTop: 4,
    color: Colors.headerText,
  },
  playBtn: {
    paddingTop: 10,
  },
});
export default trendingCardStyle;
