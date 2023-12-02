import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const genreStyles = StyleSheet.create({
  container: {
    marginTop: 6,

    paddingBottom: 12,
    paddingLeft: 6,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#F3F4F8",
    borderRadius: 10,
    marginHorizontal: 2,
    shadowColor: Colors.lightBg,
  },
  btnText: {
    fontFamily: "dm-b",
    fontSize: 16,
    color: Colors.headerText,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnSubText: {
    fontFamily: "dm-sb",
    fontSize: 12,
    color: Colors.headerText,
  },
  headerText: {
    marginLeft: 20,
    fontFamily: "dm-b",
    fontSize: 28,
    color: Colors.headerText,
    paddingBottom: 12,
  },
  showAllBtn: {
    paddingBottom: 12,
    marginRight: 24,
  },
  icon: {},
});

export default genreStyles;
