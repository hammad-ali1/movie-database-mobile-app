import { useEffect, createRef, useState, useRef } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import colors from "../config/colors";
//Hooks
//PropTypes
type PropTypes = {
  backgroundColor?: string;
  setInputTerm: setState<string>;
};

export default function CustomTextInput({
  setInputTerm,
  backgroundColor,
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

  //add user styles
  const userStyles: any = {};
  if (backgroundColor) userStyles["backgroundColor"] = backgroundColor;
  return (
    <TextInput
      ref={input}
      {...props}
      style={[styles.input, userStyles]}
      value={value}
      onChangeText={setValue}
      onSubmitEditing={(event) => {
        setInputTerm(value);
      }}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.textInput,
    height: 50,
    padding: 10,
  },
});
