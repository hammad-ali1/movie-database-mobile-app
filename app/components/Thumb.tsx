import { StyleSheet, Image, Text, View } from "react-native";
import sizes from "../config/sizes";

//PropTypes
type PropTypes = {
  image: string | undefined | null;
  size?: "medium" | "big";
};
export default function Thumb({ image, size }: PropTypes) {
  let multiplyFactor;
  let userStyles: any = {};
  if (size === "medium") {
    multiplyFactor = 1.5;
  } else if (size === "big") {
    multiplyFactor = 2;
  }
  if (multiplyFactor) {
    userStyles["width"] = sizes.thumbWidth * multiplyFactor;
    userStyles["height"] = sizes.thumbHeight * multiplyFactor;
  }

  const source = image ? { uri: image } : require("../assets/no_image.jpg");
  return (
    <Image
      style={[styles.image, userStyles]}
      source={source}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    width: sizes.thumbWidth * 1.2,
    height: sizes.thumbHeight * 1.2,
    marginRight: 10,
    alignSelf: "center",
  },
});
