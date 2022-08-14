import React from "react";
import { StyleSheet, Text, View, FlatList, FlatListProps } from "react-native";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient
        // Background Linear Gradient
        colors={colors.verticalScrollLinearGradient}
      >
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
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: colors.verticalScrollContainer,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
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
