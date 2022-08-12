import { StyleSheet, Text, View } from "react-native";

//PropTypes
type PropTypes = {};

export default function MovieScreen({ navigation, route }: NavigatorProps) {
  const { id } = route.params;
  return (
    <View style={[styles.container]}>
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
