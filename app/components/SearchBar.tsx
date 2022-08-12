import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
function SearchBar() {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={24} color={colors.searchIcon} />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: "row",
    backgroundColor: "blue",
    justifyContent: "center",
  },
  input: {
    flex: 0.5,
    backgroundColor: "red",
    borderRadius: 20,
    opacity: 0.5,
    padding: 5,
  },
});
