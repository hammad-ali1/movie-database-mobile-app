import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { POSTER_SIZE, IMAGE_BASE_URL, BACKDROP_SIZE } from "../config/config";

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
    <ScrollView style={[styles.container]}>
      <View style={styles.movieDetails}>
        <View style={styles.image}>
          <ImageBackground
            style={styles.imageBackground}
            source={{
              uri: `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`,
            }}
            resizeMode="cover"
            imageStyle={{
              opacity: 0.7,
            }}
          >
            <Thumb
              align="flex-start"
              size="medium"
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : undefined
              }
            />
          </ImageBackground>
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      <View style={styles.actors}></View>
    </ScrollView>
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
  image: {
    flex: 1,
    marginBottom: 10,
  },
  imageBackground: {
    padding: 10,
    flexDirection: "row",
  },
  overview: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  actors: {
    flex: 1,
    backgroundColor: "blue",
  },
});
