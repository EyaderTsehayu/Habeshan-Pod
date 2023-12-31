import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const popularStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 20,
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
    backgroundColor: Colors.cardBg,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  //card part

  cardContainer: {
    paddingTop: 12,
  },
});

export default popularStyle;
