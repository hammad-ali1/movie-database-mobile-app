export {};
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

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
}
