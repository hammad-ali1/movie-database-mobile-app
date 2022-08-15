import { StyleSheet, Text, View } from "react-native";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../config/config";

//Hooks
import useMovieDetailsFetch from "../hooks/useMovieDetailsFetch";
//components
import Thumb from "../components/Thumb";
//PropTypes
type PropTypes = {};

export default function MovieScreen({ navigation, route }: RouteProps) {
  const { id } = route.params;
  const { state: movie } = useMovieDetailsFetch(id);
  return (
    <View style={[styles.container]}>
      <View style={styles.movieDetails}>
        <Thumb
          size="medium"
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : undefined
          }
        />
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      <View style={styles.actors}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieDetails: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  actors: {
    flex: 1,
    backgroundColor: "blue",
  },
});
