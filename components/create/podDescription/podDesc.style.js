import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const podDescStyles = new StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderRadius: 30,
    //height: "100%",
  },

  input: {
    fontFamily: "dm",
    width: "100%",
    marginHorizontal: 5,
    backgroundColor: Colors.lightBg,
    paddingVertical: 8,
    paddingLeft: 14,
    borderRadius: 12,
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 12,
  },
  uploadBtn: {
    display: "flex",
    flexDirection: "row",
    columnGap: 12,
    backgroundColor: Colors.primary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 18,
    marginTop: 8,
  },
  btnText: {
    fontFamily: "dm-b",
    fontSize: 20,
    color: Colors.headerText,
  },
});

export default podDescStyles;
