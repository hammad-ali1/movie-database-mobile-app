import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

//Props
type PropTypes = {
  gradientColors?: string[];
};
function CustomLinearGradient({ gradientColors }: PropTypes) {
  return (
    <LinearGradient
      colors={gradientColors ? gradientColors : colors.linearGradient}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      }}
    />
  );
}

export default CustomLinearGradient;
