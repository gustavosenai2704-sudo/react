import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api, { getApiErrorMessage } from "../services/api.js";
import { saveAuthSession } from "../services/authStore.js";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, settelefone] = useState("");
  const [nascimento, setnascimento] = useState("");
  const [genero, setgenero] = useState("");

  function formaApi(data) {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  async function Cadastrar() {
    if (nome === "" || email === "" || senha === "" || telefone === "" || nascimento === "" || genero === "") {
      Alert.alert("ERRO", "Favor preencher todos os campos!");
      return;
    }

    if (nascimento.split("/").length !== 3) {
      Alert.alert("ERRO", "Digite a data no formato dd/mm/aaaa.");
      return;
    }

    const values = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      nascimento: formaApi(nascimento),
      genero: genero,
    };

    console.log("Dados enviados:", values);

    try {
      const response = await api.post("/cadastro_usuario", values);
      console.log("Resposta da API:", response.data);

      if (!response.data?.token) {
        Alert.alert("ERRO", "A API cadastrou o usuario, mas nao retornou o token.");
        return;
      }

      await saveAuthSession({
        token: response.data.token,
        user: response.data.user || {
          nome: values.nome,
          email: values.email,
        },
      });

      Alert.alert("Sucesso!", "Usuario cadastrado e autenticado com sucesso!");
      navigation.navigate("Cep");
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel cadastrar o usuario.");

      console.log("Erro completo:", error.response?.data || error.message);
      Alert.alert("ERRO", String(errorMessage));
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerPill}>
          <Text style={styles.headerPillText}>NOVA CONTA</Text>
        </View>

        <Text style={styles.title}>Monte seu perfil meteorologico</Text>
        <Text style={styles.subtitle}>
          Cadastre-se para salvar consultas, acompanhar o tempo e receber destaques no mesmo estilo da home.
        </Text>

        <View style={styles.headerInfo}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Hoje</Text>
            <Text style={styles.infoValue}>Max 29°C</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Amanhã</Text>
            <Text style={styles.infoValue}>Chance de chuva</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Criar conta</Text>
        <Text style={styles.cardSubtitle}>Preencha seus dados para entrar no painel.</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#6b7280"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6b7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#6b7280"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={settelefone}
        />

        <TextInput
          style={styles.input}
          placeholder="Nascimento (dd/mm/aaaa)"
          placeholderTextColor="#6b7280"
          value={nascimento}
          onChangeText={setnascimento}
        />

        <TextInput
          style={styles.input}
          placeholder="Genero"
          placeholderTextColor="#6b7280"
          value={genero}
          onChangeText={setgenero}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={Cadastrar}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.secondaryButtonText}>Ja tem uma conta? Faca login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: "#2563eb",
    borderRadius: 30,
    padding: 24,
    marginBottom: 18,
  },
  headerPill: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff24",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  headerPillText: {
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
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#ffffff20",
    borderRadius: 18,
    padding: 14,
  },
  infoLabel: {
    color: "#dbeafe",
    fontSize: 13,
    marginBottom: 6,
  },
  infoValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
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
