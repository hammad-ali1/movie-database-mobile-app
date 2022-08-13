import { useEffect, createRef, useState, useRef } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import useIsInitialRender from "../hooks/useIsInitialRender";

//Hooks
//PropTypes
type PropTypes = { setInputTerm: setState<string> };

export default function CustomTextInput({
  setInputTerm,
  ...props
}: PropTypes & TextInputProps) {
  //
  const isInitialRender = useIsInitialRender();
  //Refs
  const input = createRef<TextInput>();
  //States
  const [value, setValue] = useState("");
  //Effects
  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    if (isInitialRender) return;
    setInputTerm("");
  }, [value]); //if user removes all text without submitting.
  return (
    <View style={[styles.container]}>
      <TextInput
        ref={input}
        {...props}
        style={styles.input}
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
