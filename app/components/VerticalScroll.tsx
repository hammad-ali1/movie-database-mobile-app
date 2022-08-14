import React from "react";
import { StyleSheet, Text, View, FlatList, FlatListProps } from "react-native";
import colors from "../config/colors";

//Types
type PropTypes = {
  title?: string;
  margin?: number | string;
};
export default function VerticalScroll({
  title,
  margin,
  ...props
}: PropTypes & FlatListProps<ScrollItems>) {
  return (
    <View style={styles.listContainer}>
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
    color: colors.scrollBarTitle,
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  defaultListStyle: {
    backgroundColor: colors.verticalScrollBackGround,
    marginBottom: 10,
  },
});
