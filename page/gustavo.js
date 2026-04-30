import {useState,useEffect} from 'react';
import axios from 'axios';

import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, FlatList, Pressable, Modal, Button, StyleSheet} from 'react-native';


export default function Lista(){
    


    const [dados, setDados] = useState([]);
    const [modal, setModal] = useState(false);
    const [recebeDados, setRecebeDados] = useState({});

    useEffect(() => {

        async function Buscar() {
            try {

                const response = await axios.get('https://68e447c28e116898997b7339.mockapi.io/teste/user')
                console.log(response.data);
                setDados(response.data); 

                
            }catch (error) {

                console.log("ERRO",error.response.data.errors)

            }
        }

        Buscar();

    },[])

    const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={()=>{
        setRecebeDados(item);
        setModal(true);
    }}>    
        <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </View>
    </Pressable>    
    )


    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Lista de usuarios</Text>
            <Text style={styles.subtitle}>Toque em um usuario para ver os detalhes.</Text>
        </View>

        <FlatList
        data={dados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
            <Text style={styles.empty}>Carregando usuarios...</Text>
        }
        />

     <Modal
        visible={modal}
        transparent={false}
        onRequestClose={() => setModal(false)}
     >
        <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Detalhes do usuario</Text>
            <Text style={styles.modalName}>{recebeDados.name}</Text>
            <Text style={styles.modalEmail}>{recebeDados.email}</Text>
            <Button title="Fechar" onPress={() => setModal(false)} />
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
        paddingTop: 18,
        paddingBottom: 14,
    },
    title: {
        color: "#111827",
        fontSize: 28,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#6b7280",
        fontSize: 15,
        marginTop: 4,
    },
    list: {
        paddingBottom: 24,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#dbeafe",
        elevation: 2,
    },
    name: {
        color: "#111827",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },
    email: {
        color: "#2563eb",
        fontSize: 15,
    },
    empty: {
        color: "#6b7280",
        fontSize: 16,
        textAlign: "center",
        marginTop: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: 24,
    },
    modalCard: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 22,
        borderWidth: 1,
        borderColor: "#dbeafe",
    },
    modalTitle: {
        color: "#6b7280",
        fontSize: 14,
        marginBottom: 12,
    },
    modalName: {
        color: "#111827",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    modalEmail: {
        color: "#2563eb",
        fontSize: 16,
        marginBottom: 20,
    },
});
