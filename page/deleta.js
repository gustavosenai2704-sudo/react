import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api, { getApiErrorMessage, toFormUrlEncoded } from "../services/api.js";
import { clearAuthSession, getToken } from "../services/authStore.js";

export default function Deleta({ navigation }) {
  const route = useRoute();
  const item = route.params || {};
  const [idClima, setIdClima] = useState((item.id_clima || item.id || "").toString());
  const [loading, setLoading] = useState(false);

  async function deletarClima() {
    const idClimaLimpo = idClima.trim();

    if (idClimaLimpo === "") {
      Alert.alert("ERRO", "Informe o ID do clima para deletar.");
      return;
    }

    if (loading) {
      return;
    }

    Alert.alert("Atencao!", "Tem certeza que deseja deletar esse clima?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        style: "destructive",
        onPress: confirmarDelete,
      },
    ]);
  }

  async function confirmarDelete() {
    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Login necessario", "Entre com sua conta antes de deletar clima no banco.");
        return;
      }

      const response = await api.delete("/deletar_clima", {
        data: toFormUrlEncoded({
          token,
          id_clima: idClima.trim(),
          id: idClima.trim(),
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data?.erro === "s") {
        if (String(response.data?.msg || "").toLowerCase().includes("token")) {
          await clearAuthSession();
          Alert.alert("Login necessario", "Seu login expirou ou esta invalido. Entre novamente para deletar no banco.");
          navigation.navigate("Login");
          return;
        }

        Alert.alert("Erro", response.data?.msg || "A API nao conseguiu deletar o clima.");
        return;
      }

      console.log("Clima deletado no banco.:", response.data);
      Alert.alert("Sucesso", "Clima deletado com sucesso!");
      navigation.navigate("Lista");
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel deletar o clima no banco.");
      console.log("ERRO ao deletar clima no banco", error.response?.data || error.message);
      Alert.alert("Erro", String(errorMessage));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.badge}>EXCLUIR REGISTRO</Text>
        <Text style={styles.title}>Deletar clima</Text>
        <Text style={styles.subtitle}>Informe o ID do clima ou abra esta tela pela lista para preencher automaticamente.</Text>
      </View>

      <View style={styles.card}>
        {!!item.cidade && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>{item.cidade}</Text>
            <Text style={styles.previewText}>
              {item.estado} - {item.temperatura}C - {item.condicao}
            </Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="ID do clima"
          placeholderTextColor="#6b7280"
          value={idClima}
          onChangeText={setIdClima}
          keyboardType="numeric"
        />

        <TouchableOpacity style={[styles.deleteButton, loading && styles.disabledButton]} onPress={deletarClima} disabled={loading}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Deletar clima</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Lista")} disabled={loading}>
          <Text style={styles.secondaryButtonText}>Voltar para lista</Text>
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
  preview: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  previewTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  previewText: {
    color: "#4b5563",
    fontSize: 14,
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
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#dc2626",
    borderRadius: 14,
    marginTop: 4,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#2563eb",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.7,
  },
});
