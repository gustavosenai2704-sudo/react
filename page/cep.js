import { useState } from 'react';
import { View, TextInput, TouchableOpacity, ImageBackground, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Cep({ navigation }){
  
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  
  async function Buscar(){

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    console.log(response.data);
    

    setEndereco(response.data.logradouro);
    setBairro(response.data.bairro);
    setCidade(response.data.localidade);
    setEstado(response.data.uf);

  }

  return (
    <ImageBackground 
      source={{ uri: 'https://blog.shoppub.com.br/wp-content/uploads/2025/02/faixa-de-CEP-scaled.jpg' }} 
      style={styles.ImgBack}
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Busca Cep</Text>
        <Text style={styles.subtitulo}>Spider</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Cep"
          placeholderTextColor="#999"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={8}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#999"
          value={endereco}
          onChangeText={setEndereco}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#999"
          value={bairro}
          onChangeText={setBairro}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#999"
          value={cidade}
          onChangeText={setCidade}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor="#999"
          value={estado}
          onChangeText={setEstado}
        />
        
        <TouchableOpacity style={styles.button} onPress={Buscar}>
          <Text style={styles.buttonText}>BUSCAR CEP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImgBack: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 25,
  },
  titulo: {
    fontSize: 36,
    color: "#f3eb0d",
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 24,
    color: "#f3eb0d",
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#f3eb0d',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    backgroundColor: '#f3eb0d',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
