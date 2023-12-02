import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const myPodListstyles = StyleSheet.create({
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

  noPodcastTxt: {
    fontFamily: "dm-b",
    fontSize: 34,
    textAlign: "center",
    padding: 24,
    color: Colors.headerText,
  },
  noPostImg: {
    height: 300,
    width: 400,
    resizeMode: "contain",
  },
});

export default myPodListstyles;
