import { StyleSheet, Image, Text, View } from "react-native";
import sizes from "../config/sizes";

//PropTypes
type PropTypes = {
  image: string | undefined | null;
};
export default function Thumb({ image }: PropTypes) {
  const source = image ? { uri: image } : require("../assets/no_image.jpg");
  return <Image style={styles.image} source={source} resizeMode="cover" />;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: sizes.thumbWidth * 1.2,
    height: sizes.thumbHeight * 1.2,
    marginRight: 10,
    alignSelf: "center",
  },
});
