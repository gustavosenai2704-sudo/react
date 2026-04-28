import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api, { getApiErrorMessage, setAuthorizationToken } from "../services/api.js";
import { saveAuthSession } from "../services/authStore.js";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  async function Logar() {
    if (user === "" || pass === "") {
      Alert.alert("ERRO", "Favor preencher todos os campos!");
      return;
    }

    try {
      const response = await api.post("/login", {
        email: user,
        senha: pass,
      });

      const token = response.data?.token;

      if (!token) {
        Alert.alert("ERRO", "A API nao retornou o token do usuario.");
        return;
      }

      setAuthorizationToken(token);

      const validationResponse = await api.get("/validar_token");

      if (validationResponse.data?.valid === false) {
        setAuthorizationToken(null);
        Alert.alert("ERRO", "Token invalido. Faca login novamente.");
        return;
      }

      await saveAuthSession({
        token,
        user: validationResponse.data?.user || response.data.user || null,
      });

      Alert.alert("Sucesso!", "Usuario logado com sucesso!");
      navigation.navigate("Cep");
    } catch (error) {
      setAuthorizationToken(null);
      const errorMessage = getApiErrorMessage(error, "Usuario nao cadastrado!");
      Alert.alert("ERRO!", String(errorMessage));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>CLIMA AO VIVO</Text>
        </View>

        <Text style={styles.title}>Acesse sua previsao pessoal</Text>
        <Text style={styles.subtitle}>
          Entre para acompanhar clima, noticias e alertas em um painel leve como a tela inicial.
        </Text>

        <View style={styles.weatherCard}>
          <View>
            <Text style={styles.weatherTemp}>27°C</Text>
            <Text style={styles.weatherText}>Céu limpo para hoje</Text>
          </View>

          <View style={styles.weatherMeta}>
            <Text style={styles.weatherDetail}>Vento 12 km/h</Text>
            <Text style={styles.weatherDetail}>Umidade 61%</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Faca seu login</Text>
        <Text style={styles.cardSubtitle}>Use sua conta para continuar.</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={user}
          onChangeText={setUser}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#6b7280"
          secureTextEntry
          style={styles.input}
          value={pass}
          onChangeText={setPass}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={Logar}>
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.secondaryButtonText}>Nao tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#2563eb",
    borderRadius: 30,
    padding: 24,
    marginBottom: 18,
  },
  headerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff24",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  headerBadgeText: {
    color: "#eff6ff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#dbeafe",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  weatherCard: {
    backgroundColor: "#ffffff20",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherTemp: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  weatherText: {
    color: "#dbeafe",
    marginTop: 4,
  },
  weatherMeta: {
    alignItems: "flex-end",
  },
  weatherDetail: {
    color: "#eff6ff",
    fontSize: 13,
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 22,
    elevation: 4,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 18,
  },
  input: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    alignItems: "center",
    marginTop: 16,
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
});
