import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import CustomTextInput from "../components/TextInput";

//PropTypes
type PropTypes = {};

export default function SearchScreen({}: PropTypes) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={[styles.container]}>
      <CustomTextInput
        setInputTerm={setSearchTerm}
        placeholder="Search Movies"
      />
      <Text>{searchTerm}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
