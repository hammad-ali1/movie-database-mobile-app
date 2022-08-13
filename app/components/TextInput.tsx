import { useEffect, createRef } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";

//PropTypes
type PropTypes = { inputTerm: string; setInputTerm: setState<string> };

export default function CustomTextInput({
  inputTerm,
  setInputTerm,
  ...props
}: PropTypes & TextInputProps) {
  const input = createRef<TextInput>();
  useEffect(() => {
    input.current?.focus();
  }, []);
  return (
    <View style={[styles.container]}>
      <TextInput
        ref={input}
        {...props}
        style={styles.input}
        value={inputTerm}
        onChangeText={(text) => {
          setInputTerm(text);
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
