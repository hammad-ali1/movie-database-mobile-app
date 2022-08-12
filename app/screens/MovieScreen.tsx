import { StyleSheet, Text, View } from "react-native";
//Hooks
import { useMovieFetch } from "../hooks/useMovieFetch";
//PropTypes
type PropTypes = {};

export default function MovieScreen({ navigation, route }: RouteProps) {
  const { id } = route.params;
  const { state: movie } = useMovieFetch(id);
  return (
    <View style={[styles.container]}>
      <Text>{movie.original_title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
