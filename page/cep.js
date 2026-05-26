import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";

export default function Cep({ navigation }) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);

  async function Buscar() {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      Alert.alert("CEP invalido", "Digite um CEP com 8 numeros.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      console.log(response.data);

      if (response.data?.erro) {
        Alert.alert("CEP nao encontrado", "Confira o numero digitado e tente novamente.");
        return;
      }

      setEndereco(response.data.logradouro || "");
      setBairro(response.data.bairro || "");
      setCidade(response.data.localidade || "");
      setEstado(response.data.uf || "");
    } catch (error) {
      console.log("ERRO ao buscar CEP", error.message);
      Alert.alert("Erro", "Nao foi possivel buscar o CEP agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.badge}>CONSULTA RAPIDA</Text>
        <Text style={styles.titulo}>Busca CEP</Text>
        <Text style={styles.subtitulo}>Digite o CEP para completar os dados do endereco.</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor="#6b7280"
          value={cep}
          onChangeText={(value) => setCep(value.replace(/\D/g, ""))}
          keyboardType="numeric"
          maxLength={8}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereco"
          placeholderTextColor="#6b7280"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#6b7280"
          value={bairro}
          onChangeText={setBairro}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#6b7280"
          value={cidade}
          onChangeText={setCidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor="#6b7280"
          value={estado}
          onChangeText={setEstado}
        />

        <TouchableOpacity style={[styles.button, loading && styles.disabledButton]} onPress={Buscar} disabled={loading}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Buscar CEP</Text>}
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
    flexGrow: 1,
    justifyContent: "center",
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
  titulo: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitulo: {
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
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 14,
    marginTop: 4,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.7,
  },
});
