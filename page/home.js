import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home({ navigation }) {
  const previsoes = [
    { dia: "Hoje", temp: "27C", condicao: "Ceu limpo" },
    { dia: "Amanha", temp: "24C", condicao: "Chance de chuva" },
    { dia: "Quinta", temp: "29C", condicao: "Sol entre nuvens" },
  ];

  const noticias = [
    {
      categoria: "Clima",
      titulo: "Frente fria deve chegar no fim da semana",
      resumo: "A queda de temperatura pode aumentar a chance de chuva em algumas regioes.",
    },
    {
      categoria: "Cidade",
      titulo: "Defesa Civil reforca alertas de temporais",
      resumo: "Moradores devem acompanhar avisos oficiais em dias de vento forte.",
    },
    {
      categoria: "Saude",
      titulo: "Tempo seco exige mais hidratacao",
      resumo: "Baixa umidade pode causar desconforto respiratorio durante a tarde.",
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.badge}>CLIMA AO VIVO</Text>
        <Text style={styles.title}>Painel meteorologico</Text>
        <Text style={styles.subtitle}>Acompanhe previsoes, consulte cidades e cadastre novos registros de clima.</Text>

        <View style={styles.weatherCard}>
          <View>
            <Text style={styles.weatherTemp}>27C</Text>
            <Text style={styles.weatherText}>Sao Paulo, SP</Text>
          </View>

          <View style={styles.weatherMeta}>
            <Text style={styles.weatherDetail}>Vento 12 km/h</Text>
            <Text style={styles.weatherDetail}>Umidade 61%</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Previsao da semana</Text>
        <Text style={styles.cardSubtitle}>Resumo rapido para acompanhar a mudanca do tempo.</Text>

        {previsoes.map((item) => (
          <View key={item.dia} style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>{item.dia}</Text>
              <Text style={styles.rowText}>{item.condicao}</Text>
            </View>
            <Text style={styles.rowTemp}>{item.temp}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Lista")}>
          <Text style={styles.primaryButtonText}>Ver climas cadastrados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Clima")}>
          <Text style={styles.secondaryButtonText}>Cadastrar clima</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Topicos de noticias</Text>
        <Text style={styles.cardSubtitle}>Destaques rapidos para acompanhar junto da previsao.</Text>

        {noticias.map((item) => (
          <View key={item.titulo} style={styles.newsItem}>
            <Text style={styles.newsCategory}>{item.categoria}</Text>
            <Text style={styles.newsTitle}>{item.titulo}</Text>
            <Text style={styles.newsText}>{item.resumo}</Text>
          </View>
        ))}
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
    marginBottom: 18,
  },
  weatherCard: {
    alignItems: "center",
    backgroundColor: "#ffffff20",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  weatherTemp: {
    color: "#ffffff",
    fontSize: 30,
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
    borderRadius: 24,
    marginBottom: 18,
    padding: 20,
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
  row: {
    alignItems: "center",
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 14,
  },
  rowTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  rowText: {
    color: "#4b5563",
    fontSize: 14,
    marginTop: 2,
  },
  rowTemp: {
    color: "#2563eb",
    fontSize: 22,
    fontWeight: "bold",
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
  newsItem: {
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
    paddingBottom: 14,
    marginBottom: 14,
  },
  newsCategory: {
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff",
    borderRadius: 999,
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newsTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  newsText: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
  },
});
