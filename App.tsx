import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import colors from "./app/config/colors";
//Components
import MovieHome from "./app/screens/HomeScreen";

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
    backgroundColor: colors.primary,
  },
});
