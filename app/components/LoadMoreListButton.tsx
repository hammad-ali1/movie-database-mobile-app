import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
//PropTypes
type PropTypes = { onPress?: onPressHandler };

export default function ({ onPress }: PropTypes) {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
        <AntDesign style={styles.icon} name="arrowright" size={50} />
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
    alignContent: "center",
    width: 100,
  },
  icon: {
    color: colors.loadMoreList,
    alignSelf: "center",
  },
  text: {
    color: colors.loadMoreList,
    fontSize: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
