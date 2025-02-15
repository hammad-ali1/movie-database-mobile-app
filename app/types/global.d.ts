export {};
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureResponderEvent } from "react-native";
import { Movie } from "../api/moviedb.api";

declare global {
  //Stack Types
  type RootStackParamList = {
    Home: undefined; //route takes no params
    Movie: { id: number };
    Search: undefined;
  };
  type RouteProps = NativeStackScreenProps<RootStackParamList, "Movie">;
  type ScreenNavigationProp = RouteProps["navigation"];
  type ScreenRouteProp = Props["route"];

  //others
  type setState<T> = React.Dispatch<React.SetStateAction<T>>;
  type onPressHandler = (event: GestureResponderEvent) => void;
  //items in scrollBar
  type ScrollItems = Movie | any;
}
