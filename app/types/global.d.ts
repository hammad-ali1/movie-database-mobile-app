export {};
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  type RootStackParamList = {
    Home: undefined; //route takes no params
    Movie: { id: number };
    Search: undefined;
  };
  type RouteProps = NativeStackScreenProps<RootStackParamList, "Movie">;
}
