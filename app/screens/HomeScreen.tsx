import { StyleSheet, SafeAreaView } from "react-native";

//Config
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";
//Components
import HeroImage from "../components/HeroImage";
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
  const popularMovies = state.popular;
  const topMovies = state.topRated;
  const trendinMovies = state.trendingMovies;

  const horintalScrolls = [
    renderHorizontalScroll("TOP MOVIES", topMovies.results, navigation),
    renderHorizontalScroll("POPULAR MOVIES", popularMovies.results, navigation),
    renderHorizontalScroll(
      "TRENDING MOVIES",
      trendinMovies.results,
      navigation
    ),
  ];
  return (
    <SafeAreaView style={[styles.container]}>
      <CustomStatusBar />
      {popularMovies.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${popularMovies.results[0].backdrop_path}`}
          title={popularMovies.results[0].original_title}
          text={popularMovies.results[0].overview}
        />
      )}
      <VerticalScroll
        title="MOVIES"
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
