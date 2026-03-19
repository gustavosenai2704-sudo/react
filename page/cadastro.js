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

import { useFonts } from "expo-font";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  function cadastrar() {
    if (nome === "" || email === "" || pass === "" || confirmPass === "") {
      Alert.alert("Erro", "Favor preencher todos os campos");
    } else if (pass !== confirmPass) {
      Alert.alert("Erro", "As senhas não coincidem");
    } else {
      Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    }
  }

  const voltarLogin = () => {
    navigation.navigate("Login");
  };

  const [font] = useFonts({
    spider: require("../assets/fonts/spider.ttf"),
  });

  if (!font) {
    return null;
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      }}
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* 🚗 Logo WL Cars */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoWL}>WL</Text>
            <Text style={styles.logoCars}>Cars</Text>
          </View>

          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados
          </Text>

          <TextInput
            placeholder="Nome completo"
            placeholderTextColor="#888"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={pass}
            onChangeText={setPass}
          />

          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={confirmPass}
            onChangeText={setConfirmPass}
          />

          <TouchableOpacity style={styles.cadastroBtn} onPress={cadastrar}>
            <Text style={styles.cadastroBtnText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={voltarLogin}>
            <Text style={styles.buttonText}>Voltar ao Login</Text>
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
    backgroundColor: "rgba(10,10,10,0.85)",
    justifyContent: "center",
    padding: 25,
  },

  card: {
    backgroundColor: "#111",
    padding: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  /* 🚗 Logo */
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  logoWL: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 4,
  },

  logoCars: {
    fontSize: 16,
    color: "#fff",
    letterSpacing: 2,
    marginTop: -5,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "spider",
  },

  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },

  cadastroBtn: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  cadastroBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FFD700",
  },

  buttonText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
});