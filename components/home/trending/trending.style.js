import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const trendingStyle = StyleSheet.create({
  activity: {
    paddingBottom: 50,
    paddingTop: 30,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "dm-b",
    fontSize: 28,
    color: Colors.headerText,
  },
  subText: { fontFamily: "dm-sb", fontSize: 14, color: Colors.headerText },
  showAllBtn: {
    backgroundColor: "#DDF2FD",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  //Trending card

  cardContainer: {
    paddingTop: 12,
    rowGap: 12,
  },
});

export default trendingStyle;
