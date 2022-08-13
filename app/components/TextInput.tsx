import { useEffect, createRef, useState, useRef } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
//Hooks
//PropTypes
type PropTypes = { setInputTerm: setState<string> };

export default function CustomTextInput({
  setInputTerm,
  ...props
}: PropTypes & TextInputProps) {
  //Refs
  const input = createRef<TextInput>();
  //States
  const [value, setValue] = useState("");
  //Effects
  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    if (value === "") setInputTerm(value);
  }, [value]); //if user removes all text without submitting.
  return (
    <View style={[styles.container]}>
      <TextInput
        ref={input}
        {...props}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={(event) => {
          setInputTerm(value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 50,
    padding: 10,
  },
});
