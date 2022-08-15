import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  FlatListProps,
  TextStyle,
} from "react-native";
import { Movie, Show } from "../api/moviedb.api";
import colors from "../config/colors";

//Types
type PropTypes = {
  title?: string;
  titleStyles?: TextStyle;
};
export default function HorizontalScroll({
  title,
  titleStyles,
  ...props
}: PropTypes & FlatListProps<Movie | Show>) {
  return (
    <View style={styles.listContainer}>
      {title && <Text style={[styles.title, titleStyles]}>{title}</Text>}
      <FlatList
        horizontal
        style={[styles.defaultListStyle, props.style]}
        keyExtractor={(item, index) => item.id.toString() + index}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    color: colors.horizontalScollTitle,
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  defaultListStyle: {
    backgroundColor: colors.horizontalScrollBarBackGround,
  },
});
