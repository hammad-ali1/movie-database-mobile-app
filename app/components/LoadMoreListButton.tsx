import { StyleSheet, Text, View } from "react-native";

//PropTypes
type PropTypes = {};

export default function ({}: PropTypes) {
  return <View style={[styles.container]}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
