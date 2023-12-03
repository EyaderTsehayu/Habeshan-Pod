import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const filePickerStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    rowGap: 20,
  },
  imagePickerCont: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderStyle: "dashed",
    height: 150,
    padding: 6,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
  },
  imagePickerMsgCont: {
    display: "flex",
    flexDirection: "column",
    padding: 22,
    columnGap: 12,
  },
  imagePickerMsgHeader: {
    color: Colors.headerText,
    fontFamily: "dm-b",
    fontSize: 26,
  },
  imagePickerMsgSubtext: {
    color: Colors.lightNavy,
    fontFamily: "dm-sb",
    paddingTop: 6,
  },
  imageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  audioPickerCont: {
    backgroundColor: Colors.secondary,

    height: 150,

    borderRadius: 20,
  },
  audioPickerMsgCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    padding: 32,
    columnGap: 12,
  },
  audioPickerMsgSubtext: {
    color: Colors.lightNavy,
    fontFamily: "dm-sb",
    paddingTop: 6,
  },
  docView: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    rowGap: 12,
  },
  podImg: {
    height: 100,
    width: 120,
    resizeMode: "contain",
  },
  galleryImg: {
    height: 100,
    width: 80,
    resizeMode: "contain",
  },
});
export default filePickerStyles;
