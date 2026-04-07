import { useState } from "react";
import React from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function Logar() {
    if (user === "" || pass === "") {
      Alert.alert("ERRO", "Favor preencher todos os campos!");
    } else if (user === "Lucas" && pass === "123") {
      Alert.alert("Sucesso!", "Usuario logado com sucesso!");
      navigation.navigate("Cep");
    } else {
      Alert.alert("ERRO!", "Usuario nao cadastrado!");
    }
  }

  const nav = () => {
    navigation.navigate("Cadastro");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://blog.shoppub.com.br/wp-content/uploads/2025/02/faixa-de-CEP-scaled.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Faca seu login</Text>

          <TextInput
            placeholder="Usuario"
            placeholderTextColor="#000000"
            style={styles.input}
            value={user}
            onChangeText={setUser}
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#000000"
            secureTextEntry
            style={styles.input}
            value={pass}
            onChangeText={setPass}
          />

          <TouchableOpacity style={styles.botao} onPress={Logar}>
            <Text style={styles.txtBotao}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nav}>
            <Text style={styles.link}>Nao tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22, 27, 4, 0.6)",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#000000b2",
    padding: 25,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fbff00",
  },
  botao: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  txtBotao: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
  },
});
