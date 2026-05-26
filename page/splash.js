import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import * as Font from 'expo-font';

export default function Splash({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'spider': require('../assets/fonts/spider.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const time = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(time);
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/splashcity.jpg')} style={style.container}>
      <View style={style.overlay}>
        <Image source={require('../assets/logo.png')} style={style.logoImage} />
        
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
   // semi-transparent overlay
  },
  logoImage: {
    width: 300,
    height: 300,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: 'spider',
  },
});
