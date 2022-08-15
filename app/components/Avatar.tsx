import { StyleSheet, Text, View } from "react-native";
import { Avatar, AvatarProps } from "@rneui/base";
import globalStyles from "../styles/globalStyles";

//PropTypes
type PropTypes = {
  image?: string;
  text?: string;
};

export default function ({ image, text, ...props }: PropTypes & AvatarProps) {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={
          image
            ? require("../assets/no_image.jpg")
            : {
                uri: image,
              }
        }
        {...props}
      />
      <Text style={[globalStyles.p]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
