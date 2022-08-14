import { StyleSheet, SafeAreaView } from "react-native";
//Components
import CustomStatusBar from "../components/StatusBar";
// import Grid from "./Grid";
// import Thumb from "./Thumb";
// import Button from "./Button";
//Hooks
import useMoviesFetch from "../hooks/useMoviesFetch";
import VerticalScroll from "../components/VerticalScroll";
// helpers
import { renderHorizontalScroll } from "../helpers/renderers";

function MovieHome({ navigation }: RouteProps) {
  const { state, loading, error, setIsLoadingMore } = useMoviesFetch({
    search: false,
    topRated: true,
    popular: true,
    trending: "week",
  });
  const popularMovies = state.movies.popularMovies;
  const topMovies = state.movies.topRatedMovies;
  const trendingMovies = state.movies.trendingMovies;
  //shows
  const popularShows = state.shows.popularShows;
  const topShows = state.shows.topRatedShows;
  const trendingShows = state.shows.trendingShows;

  const horintalScrolls = [
    renderHorizontalScroll("TOP MOVIES", topMovies.results, navigation),
    renderHorizontalScroll("POPULAR MOVIES", popularMovies.results, navigation),
    renderHorizontalScroll(
      "TRENDING MOVIES",
      trendingMovies.results,
      navigation
    ),
    renderHorizontalScroll("TOP SHOWS", topShows.results, navigation),
    renderHorizontalScroll("POPULAR SHOWS", popularShows.results, navigation),
    renderHorizontalScroll("TRENDING SHOWS", trendingShows.results, navigation),
  ];
  return (
    <SafeAreaView style={[styles.container]}>
      <CustomStatusBar />

      <VerticalScroll
        linearGradinet
        data={horintalScrolls}
        margin={20}
        renderItem={({ item }) => item}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export default MovieHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollBar: {
    flex: 1,
  },
});
