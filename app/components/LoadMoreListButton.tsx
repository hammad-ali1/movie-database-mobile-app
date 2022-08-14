import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";
//PropTypes
type PropTypes = { onPress?: onPressHandler };

export default function ({ onPress }: PropTypes) {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
        <Text style={styles.text}>LOAD MORE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: colors.loadMoreList,
    fontWeight: "bold",
  },
});
