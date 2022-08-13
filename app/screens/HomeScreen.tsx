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
import { useHomeFetch } from "../hooks/useHomeFetch";
import HorizontalScroll from "../components/HorizontalScroll";

// //Image
// import NO_IMAGE from "../../images/no_image.jpg";

function MovieHome({ navigation }: RouteProps) {
  const { state, loading, error, setIsLoadingMore } = useHomeFetch();
  // console.log(state.results[0]?.backdrop_path);

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomStatusBar />
      {state.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      )}
      <HorizontalScroll>
        {state.results.map((movie) => (
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
});
