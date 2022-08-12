import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";

//Components
import MovieHome from "./components/MovieHome";

export default function App() {
  return (
    <SafeAreaView style={[styles.container]}>
      <MovieHome />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363636",
  },
});
