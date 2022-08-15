import { StyleSheet } from "react-native";
import sizes from "../config/sizes";
const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: { fontWeight: "bold", fontSize: sizes.fontBig, marginBottom: 10 },
  p: { fontSize: sizes.fontMed, marginBottom: 5 },
});

export default globalStyles;
