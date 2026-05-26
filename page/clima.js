import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api, { getApiErrorMessage, toFormUrlEncoded } from "../services/api.js";
import { clearAuthSession, getToken } from "../services/authStore.js";
import { normalizarNumero, validarDadosClima } from "../services/climaValidation.js";
import { montarPayloadClima } from "../services/climaMapper.js";

export default function Clima({ navigation }) {
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [condicao, setCondicao] = useState("");
  const [umidade, setUmidade] = useState("");
  const [vento, setVento] = useState("");
  const [data, setData] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrarClima() {
    const values = {
      cidade: cidade.trim(),
      estado: estado.trim().toUpperCase(),
      temperatura: normalizarNumero(temperatura),
      condicao: condicao.trim(),
      umidade: normalizarNumero(umidade),
      vento: normalizarNumero(vento),
      data: data.trim(),
      observacao: observacao.trim(),
    };

    const validationError = validarDadosClima(values);

    if (validationError) {
      Alert.alert("ERRO", validationError);
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Login necessario", "Entre com sua conta antes de salvar clima no banco.");
        return;
      }

      const response = await api.post(
        "/salva_clima",
        toFormUrlEncoded(montarPayloadClima(token, values)),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data?.erro === "s") {
        if (String(response.data?.msg || "").toLowerCase().includes("token")) {
          await clearAuthSession();
          Alert.alert("Login necessario", "Seu login expirou ou esta invalido. Entre novamente para salvar no banco.");
          navigation.navigate("Login");
          return;
        }

        Alert.alert("Erro", response.data?.msg || "A API nao conseguiu salvar o clima.");
        return;
      }

      console.log("Clima cadastrado no banco.:", response.data);
      Alert.alert("Sucesso", "Clima cadastrado no banco com sucesso!");
      navigation.navigate("Lista");
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel cadastrar o clima no banco.");
      console.log("ERRO ao cadastrar clima no banco", error.response?.data || error.message);
      Alert.alert("Erro", String(errorMessage));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.badge}>NOVO REGISTRO</Text>
        <Text style={styles.title}>Cadastrar clima</Text>
        <Text style={styles.subtitle}>Preencha os dados da previsao para salvar no painel.</Text>
      </View>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Cidade" placeholderTextColor="#6b7280" value={cidade} onChangeText={setCidade} />
        <TextInput style={styles.input} placeholder="Estado (UF)" placeholderTextColor="#6b7280" value={estado} onChangeText={setEstado} maxLength={2} />
        <TextInput
          style={styles.input}
          placeholder="Temperatura (somente numero)"
          placeholderTextColor="#6b7280"
          keyboardType="numeric"
          value={temperatura}
          onChangeText={setTemperatura}
        />
        <TextInput style={styles.input} placeholder="Condicao" placeholderTextColor="#6b7280" value={condicao} onChangeText={setCondicao} />
        <TextInput style={styles.input} placeholder="Umidade (somente numero)" placeholderTextColor="#6b7280" keyboardType="numeric" value={umidade} onChangeText={setUmidade} />
        <TextInput style={styles.input} placeholder="Vento km/h (somente numero)" placeholderTextColor="#6b7280" keyboardType="numeric" value={vento} onChangeText={setVento} />
        <TextInput style={styles.input} placeholder="Data (aaaa-mm-dd)" placeholderTextColor="#6b7280" value={data} onChangeText={setData} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Observacao"
          placeholderTextColor="#6b7280"
          value={observacao}
          onChangeText={setObservacao}
          multiline
        />

        <TouchableOpacity style={[styles.primaryButton, loading && styles.disabledButton]} onPress={cadastrarClima} disabled={loading}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonText}>Cadastrar clima</Text>}
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
    borderRadius: 28,
    padding: 24,
    marginBottom: 18,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff24",
    borderRadius: 999,
    color: "#eff6ff",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#dbeafe",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },
  input: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 14,
    color: "#111827",
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: "top",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 14,
    marginTop: 4,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.7,
  },
});
