import { useEffect, createRef, useState, useRef } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import colors from "../config/colors";
//Hooks
//PropTypes
type PropTypes = {
  backgroundColor?: string;
  setInputTerm: setState<string>;
  autoSubmit?: boolean;
  submitDelay?: number;
};

const DEFAULT_AUTO_SUBMIT_DELAY = 1000;
export default function CustomTextInput({
  setInputTerm,
  backgroundColor,
  autoSubmit,
  submitDelay,
  ...props
}: PropTypes & TextInputProps) {
  //Refs
  const input = createRef<TextInput>();
  //States
  const [state, setState] = useState("");
  //Effects
  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    if (state === "") {
      setInputTerm(state);
      return;
    }
    let timer: string | number | NodeJS.Timeout | undefined;
    if (autoSubmit) {
      timer = setTimeout(
        () => {
          setInputTerm(state);
        },
        submitDelay ? submitDelay : DEFAULT_AUTO_SUBMIT_DELAY
      );
    }

    return () => clearTimeout(timer);
  }, [state]); //if user removes all text without submitting.

  //add user styles
  const userStyles: any = {};
  if (backgroundColor) userStyles["backgroundColor"] = backgroundColor;
  return (
    <TextInput
      ref={input}
      {...props}
      style={[styles.input, userStyles]}
      value={state}
      onChangeText={setState}
      onSubmitEditing={(event) => {
        setInputTerm(state);
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
