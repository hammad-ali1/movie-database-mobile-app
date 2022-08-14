import React from "react";
import { StyleSheet, Text, View, FlatList, FlatListProps } from "react-native";
import colors from "../config/colors";
import LinearGradient from "../components/LinearGradient";
//Types
type PropTypes = {
  title?: string;
  margin?: number | string;
  linearGradinet?: boolean;
  gradientColors?: string[];
};
export default function VerticalScroll({
  title,
  margin,
  linearGradinet,
  gradientColors,
  ...props
}: PropTypes & FlatListProps<ScrollItems>) {
  return (
    <View style={styles.listContainer}>
      {linearGradinet && <LinearGradient />}
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        style={[styles.defaultListStyle, props.style]}
        keyExtractor={(item, index) => item.id.toString() + index}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                margin: margin ? margin : 0,
              }}
            />
          );
        }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: colors.verticalScrollContainer,
  },

  title: {
    color: colors.verticalScrollTitle,
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  defaultListStyle: {
    backgroundColor: colors.verticalScrollBackGround,
    marginBottom: 10,
  },
});
