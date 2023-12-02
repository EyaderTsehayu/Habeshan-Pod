import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const recommendedPodCardStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBg1,
    padding: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
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
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  title: {
    fontFamily: "dm-b",
    fontSize: 20,
    // paddingTop: 12,
    color: Colors.headerText,
  },
  creator: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    fontFamily: "dm",
    paddingVertical: 12,
    color: Colors.headerText,
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: Colors.lightNavy,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  followBtnTxt: {
    fontFamily: "dm",
    fontSize: 18,
    color: Colors.headerText,
  },
});
export default recommendedPodCardStyles;
