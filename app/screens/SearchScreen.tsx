import { useEffect, useState } from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import CustomTextInput from "../components/TextInput";
import Thumb from "../components/Thumb";
import useMoviesFetch from "../hooks/useMoviesFetch";

//PropTypes
type PropTypes = {};

export default function SearchScreen({}: PropTypes) {
  const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } =
    useMoviesFetch({ search: true });
  console.log(state);

  return (
    <View style={[styles.container]}>
      <View style={styles.input}>
        <CustomTextInput
          setInputTerm={setSearchTerm}
          placeholder="Search Movies"
        />
      </View>
      <Button title="Load More" onPress={() => setIsLoadingMore(true)} />

      {/* <HorizontalScroll style={styles.scroller}>
        {state.popular.results.map((movie) => (
          <TouchableOpacity key={movie.id}>
            <Thumb
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : "no image"
              }
            />
          </TouchableOpacity>
        ))}
      </HorizontalScroll> */}
      <HorizontalScroll style={styles.scroller}>
        {state.searchResults.results.map((movie) => (
          <TouchableOpacity key={movie.id}>
            <Thumb
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : "no image"
              }
            />
          </TouchableOpacity>
        ))}
      </HorizontalScroll>
      {/* <Text>
        {movies.results.length > 0 && movies.results[0].original_title}
      </Text> */}
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
