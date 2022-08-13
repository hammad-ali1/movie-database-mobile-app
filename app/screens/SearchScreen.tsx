import { useEffect, useState } from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import CustomTextInput from "../components/TextInput";
import Thumb from "../components/Thumb";
import { useHomeFetch } from "../hooks/useHomeFetch";

//PropTypes
type PropTypes = {};

export default function SearchScreen({}: PropTypes) {
  const {
    state: movies,
    loading,
    error,
    setSearchTerm,
    searchTerm,
    setIsLoadingMore,
  } = useHomeFetch({ loadOnSearch: true });
  return (
    <View style={[styles.container]}>
      <View style={styles.input}>
        <CustomTextInput
          setInputTerm={setSearchTerm}
          placeholder="Search Movies"
        />
      </View>
      <HorizontalScroll style={styles.scroller}>
        {movies.results.map((movie) => (
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