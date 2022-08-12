export {};

declare global {
  type NavigatorProps = {
    route: RouteProp<{ params: any }, "params">;
    navigation: NavigationScreenProp<any, any>;
  };
}
