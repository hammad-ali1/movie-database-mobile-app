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

import colors from "../config/colors";
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
              <View style={styles.ratingCircle}>
                <Text style={styles.ratingText}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
              <Text style={styles.genres}>
                {movie.genres &&
                  movie.genres.map((genre) => genre.name + " | ")}
              </Text>
            </View>
          </View>
        </ImageBackground>
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
    backgroundColor: colors.movieDeailsBG,
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
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.ratingBG,
  },
  ratingText: {
    alignSelf: "center",
    color: colors.ratingTXT,
    fontWeight: "bold",
    fontSize: 16,
  },
  genres: {
    color: colors.genresTXT,
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  overview: {
    backgroundColor: colors.overviewBG,
    color: colors.overviewTXT,
    fontSize: 16,
    padding: 10,
  },

  actors: {
    flex: 1,
    backgroundColor: colors.actorsContainer,
  },
});
