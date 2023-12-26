import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const welcomeStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    // borderBottomLeftRadius: 30,
    paddingHorizontal: 12,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 40,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: Colors.secondary,
    color: Colors.primaryText,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
  },
  searchInput: {
    fontFamily: "dm",
    width: "100%",
    height: "100%",
    fontSize: 16,
    paddingHorizontal: 25,
    color: Colors.primaryText,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  hero: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 5,
  },
  welcomeMsgContainer: { width: "49%" },
  welcomeMsg: {
    color: Colors.primaryText,
    fontFamily: "dm-sb",
    fontSize: 32,
  },
  welcomeImg: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
});

export default welcomeStyles;
