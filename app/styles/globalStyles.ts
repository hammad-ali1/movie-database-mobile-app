import { StyleSheet } from "react-native";
import sizes from "../config/sizes";
const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: { fontWeight: "bold", fontSize: sizes.fontBig, marginBottom: 10 },
  p: { fontSize: sizes.fontMed, marginBottom: 5, padding: 5 },
  boxShadow: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,

    elevation: 3,
  },
});

export default globalStyles;
