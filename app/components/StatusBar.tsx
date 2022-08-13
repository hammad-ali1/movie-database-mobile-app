import { StatusBar, StatusBarProps } from "react-native";
import colors from "../config/colors";
export default function (props: StatusBarProps) {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.statusBar}
      {...props}
    />
  );
}
