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
      <View style={styles.avatar}>
        {image ? (
          <Avatar
            rounded
            icon={{ name: "user", color: "white", type: "font-awesome" }}
            source={{
              uri: image,
            }}
            {...props}
          />
        ) : (
          <Avatar
            rounded
            icon={{ name: "user", color: "white", type: "font-awesome" }}
            {...props}
          />
        )}
      </View>
      <Text style={[globalStyles.p, globalStyles.center]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  avatar: {
    alignSelf: "center",
  },
});
