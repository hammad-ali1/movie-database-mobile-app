import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import CustomTextInput from "../components/TextInput";
import useMoviesFetch from "../hooks/useMoviesFetch";
import VerticalScroll from "../components/VerticalScroll";

// helpers
import { renderHorizontalScroll } from "../helpers/renderers";

export default function SearchScreen({ navigation }: RouteProps) {
  const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } =
    useMoviesFetch({ search: true });
  const { movies, shows } = state;
  const horizontalScrolls = [
    renderHorizontalScroll(
      "MOVIES",
      movies.searchResultsMovies.results,
      navigation
    ),
    renderHorizontalScroll(
      "SHOWS",
      shows.searchResultsShows.results,
      navigation
    ),
  ];
  return (
    <View style={[styles.container]}>
      <CustomTextInput
        // backgroundColor="transparent"
        setInputTerm={setSearchTerm}
        placeholder="Search Movies"
      />
      {/* <Button title="Load More" onPress={() => setIsLoadingMore(true)} /> */}
      <VerticalScroll
        linearGradinet
        data={horizontalScrolls}
        margin={20}
        renderItem={({ item }) => item}
        keyExtractor={(item, index) => index.toString()}
      />
      {}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: "red",
  },
  scroller: {
    flex: 1,
    backgroundColor: "red",
  },
});
