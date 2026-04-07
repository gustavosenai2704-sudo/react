import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const destaques = [
  {
    titulo: "Retirada rapida",
    descricao: "Escolha o carro ideal e finalize sua reserva em poucos toques.",
  },
  {
    titulo: "Veiculos revisados",
    descricao: "Modelos urbanos, SUVs e executivos prontos para a sua viagem.",
  },
  {
    titulo: "Atendimento flexivel",
    descricao: "Suporte para aluguel diario, semanal ou mensal.",
  },
];

const categorias = ["Economico", "SUV", "Executivo", "Utilitario"];

export default function Home({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <Text style={styles.kicker}>ALUGUEL DE CARROS</Text>
            <Text style={styles.title}>Seu proximo destino comeca aqui</Text>
            <Text style={styles.description}>
              Reserve carros modernos, com estilo e praticidade, para trabalho,
              passeio ou viagens mais longas.
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.primaryButtonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("Cadastro")}
              >
                <Text style={styles.secondaryButtonText}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>Categorias em destaque</Text>
            <View style={styles.categoryRow}>
              {categorias.map((categoria) => (
                <View key={categoria} style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{categoria}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.grid}>
            {destaques.map((item) => (
              <View key={item.titulo} style={styles.featureCard}>
                <Text style={styles.featureTitle}>{item.titulo}</Text>
                <Text style={styles.featureText}>{item.descricao}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ja sabe para onde vai?</Text>
            <Text style={styles.ctaText}>
              Consulte seu endereco rapidamente e continue a experiencia dentro
              do app.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => navigation.navigate("Cep")}
            >
              <Text style={styles.ctaButtonText}>Buscar CEP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: "rgba(10, 10, 10, 0.72)",
  },
  content: {
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 18,
  },
  heroCard: {
    backgroundColor: "rgba(18, 18, 18, 0.82)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 196, 0, 0.35)",
  },
  kicker: {
    color: "#f7c948",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 14,
  },
  description: {
    color: "#d7d7d7",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#f7c948",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  infoBlock: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 18,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryBadge: {
    backgroundColor: "#1c1c1c",
    borderWidth: 1,
    borderColor: "rgba(247, 201, 72, 0.45)",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  categoryText: {
    color: "#f5f5f5",
    fontSize: 14,
    fontWeight: "700",
  },
  grid: {
    gap: 14,
  },
  featureCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 20,
    padding: 18,
  },
  featureTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  featureText: {
    color: "#444444",
    fontSize: 15,
    lineHeight: 22,
  },
  ctaCard: {
    backgroundColor: "#f7c948",
    borderRadius: 24,
    padding: 22,
  },
  ctaTitle: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  ctaText: {
    color: "#2c2c2c",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  ctaButton: {
    backgroundColor: "#111111",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
