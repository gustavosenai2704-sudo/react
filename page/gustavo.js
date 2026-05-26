import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Alert, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api, { getApiErrorMessage, getApiList, toFormUrlEncoded } from "../services/api.js";
import { clearAuthSession, getToken } from "../services/authStore.js";
import { normalizarClimaDoBanco } from "../services/climaMapper.js";

export default function Lista({ navigation }) {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function buscarClimas() {
    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Login necessario", "Entre com sua conta para carregar os climas do banco.");
        setDados([]);
        return;
      }

      const response = await api.get("/todos_climas", {
        params: {
          token,
        },
      });

      if (response.data?.erro === "s") {
        Alert.alert("Erro", response.data?.msg || "A API nao conseguiu carregar os climas.");
        setDados([]);
        return;
      }

      const climas = getApiList(response.data).map(normalizarClimaDoBanco);

      console.log("Climas recebidos do banco.:", climas);
      setDados(Array.isArray(climas) ? climas : []);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel carregar os climas do banco.");
      console.log("ERRO ao buscar climas no banco", error.response?.data || error.message);
      Alert.alert("Erro", String(errorMessage));
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      buscarClimas();
    }, [])
  );

  function confirmarDelete() {
    Alert.alert("Atencao!", "Tem certeza que deseja deletar esse clima?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        style: "destructive",
        onPress: deletarClima,
      },
    ]);
  }

  async function deletarClima() {
    if (!recebeDado || deleting) {
      return;
    }

    setDeleting(true);

    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Login necessario", "Entre com sua conta antes de deletar clima no banco.");
        return;
      }

      const idClima = recebeDado.id_clima || recebeDado.id;
      const response = await api.delete("/deletar_clima", {
        data: toFormUrlEncoded({
          token,
          id_clima: idClima,
          id: idClima,
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

      console.log("Clima deletado do banco.:", response.data);
      setDados((listaAtual) => listaAtual.filter((item) => String(item.id_clima || item.id) !== String(idClima)));
      setModal(false);
      setRecebeDado(null);
      Alert.alert("Sucesso", "Clima deletado com sucesso!");
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Nao foi possivel deletar o clima no banco.");
      console.log("ERRO ao deletar clima no banco", error.response?.data || error.message);
      Alert.alert("Erro", String(errorMessage));
    } finally {
      setDeleting(false);
    }
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        console.log("Clima selecionado.:", item);
        setRecebeDado(item);
        setModal(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{item.cidade}</Text>
          <Text style={styles.cardText}>{item.estado} - {item.data}</Text>
        </View>
        <Text style={styles.temp}>{item.temperatura}C</Text>
      </View>
      <Text style={styles.cardText}>Condicao: {item.condicao}</Text>
      <Text style={styles.cardText}>Umidade: {item.umidade}% | Vento: {item.vento} km/h</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>PAINEL DO CLIMA</Text>
        <Text style={styles.title}>Climas cadastrados</Text>
        <Text style={styles.subtitle}>Toque em um registro para editar ou excluir.</Text>
      </View>

      {loading ? (
        <ActivityIndicator color="#2563eb" size="large" style={styles.loading} />
      ) : (
        <FlatList
          data={dados}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id_clima || item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum clima encontrado.</Text>}
        />
      )}

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Clima")}>
        <Text style={styles.primaryButtonText}>Cadastrar clima</Text>
      </TouchableOpacity>

      <Modal visible={modal} transparent animationType="slide" onRequestClose={() => setModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalLabel}>Clima selecionado</Text>
            <Text style={styles.modalTitle}>{recebeDado?.cidade}</Text>
            <Text style={styles.modalText}>Estado: {recebeDado?.estado}</Text>
            <Text style={styles.modalText}>Temperatura: {recebeDado?.temperatura}C</Text>
            <Text style={styles.modalText}>Condicao: {recebeDado?.condicao}</Text>
            <Text style={styles.modalText}>Umidade: {recebeDado?.umidade}%</Text>
            <Text style={styles.modalText}>Vento: {recebeDado?.vento} km/h</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={confirmarDelete} disabled={deleting}>
              <Text style={styles.actionText}>{deleting ? "Excluindo..." : "Excluir"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteOutlineButton}
              onPress={() => {
                setModal(false);
                navigation.navigate("Deleta", recebeDado);
              }}
              disabled={deleting}
            >
              <Text style={styles.deleteOutlineText}>Abrir tela de delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setModal(false);
                navigation.navigate("Edita", recebeDado);
              }}
            >
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModal(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 18,
  },
  header: {
    backgroundColor: "#2563eb",
    borderRadius: 28,
    marginBottom: 18,
    marginTop: 12,
    padding: 24,
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
  loading: {
    marginTop: 40,
  },
  list: {
    paddingBottom: 92,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#bfdbfe",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  cardText: {
    color: "#4b5563",
    fontSize: 14,
    marginTop: 2,
  },
  temp: {
    color: "#2563eb",
    fontSize: 26,
    fontWeight: "bold",
  },
  empty: {
    color: "#6b7280",
    fontSize: 16,
    marginTop: 40,
    textAlign: "center",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 16,
    bottom: 18,
    left: 18,
    paddingVertical: 15,
    position: "absolute",
    right: 18,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    backgroundColor: "#00000080",
    flex: 1,
    justifyContent: "center",
    padding: 22,
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 22,
  },
  modalLabel: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 8,
  },
  modalTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    color: "#374151",
    fontSize: 15,
    marginBottom: 6,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#dc2626",
    borderRadius: 14,
    marginTop: 18,
    paddingVertical: 14,
  },
  deleteOutlineButton: {
    alignItems: "center",
    borderColor: "#dc2626",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 14,
  },
  deleteOutlineText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "bold",
  },
  editButton: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 14,
  },
  actionText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  closeButton: {
    alignItems: "center",
    borderColor: "#d1d5db",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 14,
  },
  closeText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
  },
});
