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

//Types
type PropTypes = {
  title?: string;
};
export default function HorizontalScroll({
  title,
  ...props
}: PropTypes & FlatListProps<Movie>) {
  return (
    <View style={styles.listContainer}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        horizontal
        style={[styles.defaultListStyle, props.style]}
        {...props}
        keyExtractor={(item, index) => item.id.toString() + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  title: {
    color: colors.scrollBarTitle,
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  defaultListStyle: {
    backgroundColor: colors.scrollBarBackGround,
    marginBottom: 10,
  },
});
