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
        <ImageBackground
          style={styles.imageBackground}
          source={
            movie.backdrop_path
              ? {
                  uri: `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`,
                }
              : require("../assets/no_image.jpg")
          }
          resizeMode="cover"
          imageStyle={{
            opacity: 0.7,
          }}
        >
          <View style={styles.posterAndText}>
            <Thumb
              align="flex-start"
              size="medium"
              image={
                movie.poster_path &&
                `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              }
            />
            <View style={styles.genreRatingContainer}>
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
              <Text style={styles.genres}>
                {movie.genres &&
                  movie.genres.map((genre) => genre.name + " | ")}
              </Text>
            </View>
          </View>
        </ImageBackground>
        {/* <View style={styles.image}>
          
        </View> */}
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

  imageBackground: {
    flex: 1,
    padding: 10,
  },
  posterAndText: {
    flexDirection: "row",
  },
  genreRatingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rating: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  genres: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
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
