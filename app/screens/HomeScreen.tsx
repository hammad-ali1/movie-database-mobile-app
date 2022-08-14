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
  //movies
  const popularMovies = state.movies.popularMovies;
  const topMovies = state.movies.topRatedMovies;
  const trendingMovies = state.movies.trendingMovies;
  //shows
  const popularShows = state.shows.popularShows;
  const topShows = state.shows.topRatedShows;
  const trendingShows = state.shows.trendingShows;

  const horintalScrolls = [
    renderHorizontalScroll({
      title: "TOP RATED MOVIES",
      items: topMovies.results,
      navigation,
      showButton: true,
      onPress: () => setLoadOptions({ topRatedMovies: true }),
    }),
    renderHorizontalScroll({
      title: "POPULAR MOVIES",
      items: popularMovies.results,
      navigation,
      showButton: true,
      onPress: () => setLoadOptions({ popularMovies: true }),
    }),
    renderHorizontalScroll({
      title: "TRENDING MOVIES",
      items: trendingMovies.results,
      navigation,
      showButton: true,
      onPress: () => setLoadOptions({ trendingMovies: "day" }),
    }),
    renderHorizontalScroll({
      title: "TOP RATED SHOWS",
      items: topShows.results,
      navigation,
      showButton: true,
      onPress: () => setLoadOptions({ topRatedShows: true }),
    }),
    renderHorizontalScroll({
      title: "POPULAR SHOWS",
      items: popularShows.results,
      navigation,
      showButton: true,
      onPress: () => setLoadOptions({ popularShows: true }),
    }),
    renderHorizontalScroll({
      title: "TRENDING SHOWS",
      items: trendingShows.results,
      navigation,
      showButton: true,
      onPress: () => setLoadOptions({ trendingShows: "day" }),
    }),
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
