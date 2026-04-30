import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Splash({ navigation }) {
  useEffect(() => {
    const time = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(time);
  }, [navigation]);

  return (
    <View style={style.container}>
      <View style={style.overlay}>
        <View style={style.logo}>
          <Text style={style.logoText}>A</Text>
        </View>
        <Text style={style.title}>Atividade</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2563eb",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "#2563eb",
    fontSize: 72,
    fontWeight: "bold",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
