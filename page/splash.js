import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {
  useEffect(() => {
    const time = setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);

    return () => clearTimeout(time);
  }, [navigation]);

  return (
    <View style={style.imgBack}>
      <Image source={require("../assets/gogle.jpg")} />
    </View>
  );
}

const style = StyleSheet.create({
  imgBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  imglogo: {
    width: 300,
    height: 300,
  },
});
