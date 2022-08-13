//Config
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import CustomTextInput from "../components/TextInput";
import useMoviesFetch from "../hooks/useMoviesFetch";
// helpers
import { renderHorizontalScroll } from "../helpers/renderers";

export default function SearchScreen({ navigation }: RouteProps) {
  const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } =
    useMoviesFetch({ search: true });
  const { searchResults } = state;
  return (
    <View style={[styles.container]}>
      <View style={styles.input}>
        <CustomTextInput
          setInputTerm={setSearchTerm}
          placeholder="Search Movies"
        />
      </View>
      <Button title="Load More" onPress={() => setIsLoadingMore(true)} />
      {renderHorizontalScroll("RESULTS", searchResults.results, navigation)}
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
