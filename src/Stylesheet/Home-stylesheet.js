import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#23272A",
    justifyContent: "flex-start"
  },
  leftHeader: {
    flex: 7,
    justifyContent: "center"
  },
  rightHeader: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  content: {
    flex: 9
  },
  iconsContainer: {
    flex: 1,
    alignItems: "center",
    margin: 15
  },
  icons: {
    margin: "auto"
  },
  text: {
    fontSize: 10,
    color: "white"
  }
});
