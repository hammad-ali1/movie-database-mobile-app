import { StyleSheet, SafeAreaView, Text, ImageBackground } from "react-native";

//Types
type PropTypes = {
  image: string;
  title: string;
  text: string;
};

function HeroImage({ image, title, text }: PropTypes) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Inside Text</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default HeroImage;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },
  text: {
    alignSelf: "center",
  },
});
