import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "./app/config/colors";
//Components
import HomeScreen from "./app/screens/HomeScreen";
import SearchScreen from "./app/screens/SearchScreen";
import MovieScreen from "./app/screens/MovieScreen";
import SearchButton from "./app/components/SearchButton";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({
            navigation,
            route,
          }: {
            navigation: ScreenNavigationProp;
            route: ScreenRouteProp;
          }) => ({
            headerRight: () => (
              <SearchButton
                // width={100}
                onPress={() => {
                  navigation.navigate("Search");
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
