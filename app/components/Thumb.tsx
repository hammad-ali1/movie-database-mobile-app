import { StyleSheet, Image, Text, View } from "react-native";
import sizes from "../config/sizes";
import NO_IMAGE from "../assets/no_image.jpg";

//PropTypes
type PropTypes = {
  image: string | undefined | null;
};
export default function Thumb({ image }: PropTypes) {
  return (
    <Image
      style={styles.image}
      source={{
        uri: image ? image : NO_IMAGE,
      }}
      resizeMode="cover"
    />
  );
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
