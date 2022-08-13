import { useEffect, useState } from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import CustomTextInput from "../components/TextInput";
import Thumb from "../components/Thumb";
import useMoviesFetch from "../hooks/useMoviesFetch";

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

      <HorizontalScroll
        data={searchResults.results}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            key={item.id}
            onPress={() => {
              navigation.navigate("Movie", { id: item.id });
            }}
          >
            <Thumb
              image={
                item.poster_path &&
                IMAGE_BASE_URL + POSTER_SIZE + item.poster_path
              }
            />
          </TouchableOpacity>
        )}
      />
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
