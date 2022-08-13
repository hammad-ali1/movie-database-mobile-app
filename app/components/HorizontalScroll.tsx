import React from "react";
import { StyleSheet, Text, ScrollView, View, ViewProps } from "react-native";
import colors from "../config/colors";
//PropTypes
type PropTypes = { children?: React.ReactNode };

export default function HorizontalScroll({
  children,
  ...props
}: PropTypes & ViewProps) {
  return (
    <View style={[styles.container]} {...props}>
      <ScrollView horizontal>
        <View style={styles.scrollItems}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    paddingTop: 10,
    paddingBottom: 10,
    // flexWrap: "wrap",
  },
  scrollBar: {
    justifyContent: "center",
  },
  scrollItems: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.scrollBarBackGround,
  },
});
