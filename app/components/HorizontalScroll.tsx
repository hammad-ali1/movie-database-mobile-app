import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  FlatListProps,
} from "react-native";
import { Movie } from "../api/moviedb.api";
import colors from "../config/colors";

export default function HorizontalScroll(props: FlatListProps<Movie>) {
  return (
    <FlatList
      horizontal
      style={[styles.defaultStyle, props.style]}
      {...props}
      keyExtractor={(item, index) => item.id.toString() + index}
    />
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: colors.scrollBarBackGround,
    marginBottom: 10,
  },
});
