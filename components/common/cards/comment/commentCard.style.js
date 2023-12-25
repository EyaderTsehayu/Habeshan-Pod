import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const commentCardStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    padding: 10,
    borderRadius: 20,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginVertical: 4,
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
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  title: {
    fontFamily: "dm",
    fontSize: 16,
    // paddingTop: 12,
    color: Colors.headerText,
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
  commentText: {
    fontSize: 14,
    fontFamily: "dm-sb",
    color: Colors.headerText,
  },
});
export default commentCardStyles;
