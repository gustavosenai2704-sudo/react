import { useEffect } from "react";
import { ImageBackground, Image, StyleSheet, View } from "react-native";

export default function Splash({ navigation }) {
  useEffect(() => {
    const time = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(time);
  }, [navigation]);

  return (
    <ImageBackground source={require("../assets/splashcity.jpg")} style={style.imgBack} resizeMode="cover">
      <View style={style.overlay}>
        <Image source={require("../assets/logo.png")} style={style.imgLogo} resizeMode="contain" />
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  imgBack: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(37, 99, 235, 0.20)",
    padding: 24,
  },
  imgLogo: {
    width: 260,
    height: 260,
  },
});
