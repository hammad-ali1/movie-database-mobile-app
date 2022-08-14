import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import sizes from "../config/sizes";
//Types
type PropTypes = {
  width?: number;
};
export default function ({
  width,
  ...otherProps
}: TouchableOpacityProps & PropTypes) {
  return (
    <TouchableOpacity
      {...otherProps}
      style={{ width: width ? width : sizes.TouchableSearchWidth }}
    >
      <Ionicons
        style={{ alignSelf: "flex-end" }}
        name="search"
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
}
