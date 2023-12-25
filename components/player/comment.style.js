import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const commentStyles = StyleSheet.create({
  addCommentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
  },
  addCommentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: "100%",
  },
  addCommentInput: {
    fontFamily: "dm",
    fontSize: 18,
    width: "90%",
    height: "100%",
  },
  addCommentBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  previousText: {
    paddingTop: 8,
    paddingLeft: 12,
    fontSize: 14,
    fontFamily: "dm-sb",
    color: Colors.headerText,
  },
});

export default commentStyles;
