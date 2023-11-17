import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const popularCardStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    padding: 10,
    borderRadius: 20,
  },
  cover: { resizeMode: "contain", height: 90, width: 120, borderRadius: 5 },
  title: { fontFamily: "dm-b", paddingTop: 12, color: Colors.headerText },
  creator: { fontFamily: "dm", paddingTop: 6, color: Colors.headerText },
});
export default popularCardStyle;
