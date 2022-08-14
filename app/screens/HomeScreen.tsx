import { StyleSheet, SafeAreaView } from "react-native";
//Components
import CustomStatusBar from "../components/StatusBar";
//Hooks
import useMoviesFetch from "../hooks/useMoviesFetch";
import VerticalScroll from "../components/VerticalScroll";
// helpers
import { renderHorizontalScroll } from "../helpers/renderers";

function MovieHome({ navigation }: RouteProps) {
  const { state, loading, error, setLoadOptions } = useMoviesFetch();

  const popularMovies = state.movies.popularMovies;
  const topMovies = state.movies.topRatedMovies;
  const trendingMovies = state.movies.trendingMovies;
  //shows
  const popularShows = state.shows.popularShows;
  const topShows = state.shows.topRatedShows;
  const trendingShows = state.shows.trendingShows;

  const horintalScrolls = [
    renderHorizontalScroll(
      "TOP RATED MOVIES",
      topMovies.results,
      navigation,
      () => setLoadOptions({ topRatedMovies: true })
    ),
    renderHorizontalScroll(
      "POPULAR MOVIES",
      popularMovies.results,
      navigation,
      () => setLoadOptions({ popularMovies: true })
    ),
    renderHorizontalScroll(
      "TRENDING MOVIES",
      trendingMovies.results,
      navigation,
      () => setLoadOptions({ trendingMovies: "day" })
    ),
    renderHorizontalScroll(
      "TOP RATED SHOWS",
      topShows.results,
      navigation,
      () => setLoadOptions({ topRatedShows: true })
    ),
    renderHorizontalScroll(
      "POPULAR SHOWS",
      popularShows.results,
      navigation,
      () => setLoadOptions({ popularShows: true })
    ),
    renderHorizontalScroll(
      "TRENDING SHOWS",
      trendingShows.results,
      navigation,
      () => setLoadOptions({ trendingShows: "day" })
    ),
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
