import { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";

export default function Pokedex() {
  const [busca, setBusca] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarPokemon() {
    const pokemonBusca = busca.trim().toLowerCase();

    if (pokemonBusca === "") {
      Alert.alert("Pokemon invalido", "Digite o nome ou numero do Pokemon.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonBusca}`);
      console.log(response.data);

      setPokemon({
        id: response.data.id,
        nome: response.data.name,
        altura: response.data.height,
        peso: response.data.weight,
        experiencia: response.data.base_experience,
        imagem: response.data.sprites?.other?.["official-artwork"]?.front_default || response.data.sprites?.front_default,
        tipos: response.data.types?.map((item) => item.type.name).join(", "),
        habilidades: response.data.abilities?.map((item) => item.ability.name).join(", "),
      });
    } catch (error) {
      console.log("ERRO ao buscar Pokemon", error.response?.data || error.message);

      if (error.response?.status === 404) {
        Alert.alert("Pokemon nao encontrado", "Confira o nome ou numero digitado e tente novamente.");
        return;
      }

      Alert.alert("Erro", "Nao foi possivel buscar o Pokemon agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.badge}>POKEDEX API</Text>
        <Text style={styles.title}>Buscar Pokemon</Text>
        <Text style={styles.subtitle}>Pesquise qualquer Pokemon pelo nome ou pelo numero da Pokedex.</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Ex: pikachu ou 25"
          placeholderTextColor="#6b7280"
          value={busca}
          onChangeText={setBusca}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={buscarPokemon}
        />

        <TouchableOpacity style={[styles.button, loading && styles.disabledButton]} onPress={buscarPokemon} disabled={loading}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Buscar Pokemon</Text>}
        </TouchableOpacity>

        {pokemon && (
          <View style={styles.result}>
            {!!pokemon.imagem && <Image style={styles.pokemonImage} source={{ uri: pokemon.imagem }} />}
            <Text style={styles.pokemonNumber}>#{pokemon.id}</Text>
            <Text style={styles.pokemonName}>{pokemon.nome}</Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Tipo: {pokemon.tipos}</Text>
              <Text style={styles.infoText}>Habilidades: {pokemon.habilidades}</Text>
              <Text style={styles.infoText}>Altura: {pokemon.altura}</Text>
              <Text style={styles.infoText}>Peso: {pokemon.peso}</Text>
              <Text style={styles.infoText}>Experiencia base: {pokemon.experiencia}</Text>
            </View>
          </View>
        )}
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
    backgroundColor: "#dc2626",
    borderRadius: 28,
    marginBottom: 18,
    padding: 24,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff24",
    borderRadius: 999,
    color: "#fff7ed",
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
    color: "#fee2e2",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    elevation: 4,
    padding: 20,
  },
  input: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    borderRadius: 14,
    borderWidth: 1,
    color: "#111827",
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  button: {
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
  disabledButton: {
    opacity: 0.7,
  },
  result: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 16,
    padding: 16,
  },
  pokemonImage: {
    height: 180,
    marginBottom: 6,
    width: 180,
  },
  pokemonNumber: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  pokemonName: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "capitalize",
  },
  infoBox: {
    alignSelf: "stretch",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
  },
  infoText: {
    color: "#4b5563",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
});
