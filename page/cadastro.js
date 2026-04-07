import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [data, setdata] = useState("");
  const telefone, settelefone] = useState("");



  function cadastrar() {
    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {

      Alert.alert("ERRO", "Favor preencher todos os campos");


    } else if (senha !== confirmarSenha) {


      Alert.alert("ERRO", "As senhas nao coincidem");

    } else {

      Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
      navigation.navigate("Cep");
    }
  }

  function formaApi(data){

      const [dia, mes, ano] = data.split("/");
      return `${ano}-${mes}-${dia}`;



  }

  function irParaLogin() {
    navigation.navigate("Login");
  }

  return (
    <ImageBackground
      source={{
        uri: "https://blog.shoppub.com.br/wp-content/uploads/2025/02/faixa-de-CEP-scaled.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.titulo}>CRIAR CONTA</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#000000ea"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000000"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#000000"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#000000"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <TouchableOpacity style={styles.button} onPress={cadastrar}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={irParaLogin}>
            <Text style={styles.linkText}>Ja tem uma conta? Faca login</Text>
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
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 25,
  },
  container: {
    backgroundColor: "#111",
    padding: 25,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fbff00",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: "#dfdfdf",
    fontSize: 14,
  },
});
