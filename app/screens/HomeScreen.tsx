import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";
//Components
import HeroImage from "../components/HeroImage";
import Thumb from "../components/Thumb";
import CustomStatusBar from "../components/StatusBar";
// import Grid from "./Grid";
// import Thumb from "./Thumb";
// import Button from "./Button";
//Hooks
import useMoviesFetch from "../hooks/useMoviesFetch";
import HorizontalScroll from "../components/HorizontalScroll";

// //Image
// import NO_IMAGE from "../../images/no_image.jpg";

function MovieHome({ navigation }: RouteProps) {
  const { state, loading, error, setIsLoadingMore } = useMoviesFetch({
    search: false,
    topRated: true,
    popular: true,
  });
  const popularMovies = state.popular;
  const topMovies = state.topRated;

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
      <HorizontalScroll
        title="TOP MOVIES"
        data={topMovies.results}
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
                item.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path
                  : "no image"
              }
            />
          </TouchableOpacity>
        )}
      />

      <HorizontalScroll
        title="POPULAR MOVIES"
        data={popularMovies.results}
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
                item.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + item.poster_path
                  : "no image"
              }
            />
          </TouchableOpacity>
        )}
      />

      {/* <HorizontalScroll>
        {topMovies.results.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => {
              navigation.navigate("Movie", { id: movie.id });
            }}
          >
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
      <HorizontalScroll>
        {popularMovies.results.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => {
              navigation.navigate("Movie", { id: movie.id });
            }}
          >
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
      {/* {state.results.map((movie) => (
        <Text key={movie.id}>{movie.original_title}</Text>
      ))} */}
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
