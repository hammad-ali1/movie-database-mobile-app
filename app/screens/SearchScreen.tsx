import { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import CustomTextInput from "../components/TextInput";
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
  } = useHomeFetch();

  return (
    <View style={[styles.container]}>
      <CustomTextInput
        setInputTerm={setSearchTerm}
        placeholder="Search Movies"
      />
      <Text>
        {movies.results.length > 0 && movies.results[0].original_title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
