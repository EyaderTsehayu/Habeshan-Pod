import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const trendingCardStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
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
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "Space-between",
  },
  cover: {
    resizeMode: "contain",
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  title: {
    fontFamily: "dm-b",
    fontSize: 18,
    paddingTop: 12,
    color: Colors.headerText,
  },
  creator: { fontFamily: "dm", paddingTop: 6, color: Colors.headerText },
});
export default trendingCardStyle;
