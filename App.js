import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Login from "./page/login";
import Cadastro from "./page/cadastro";
import Splash from "./page/splash";
import home from "./page/home";
import usuario from "./page/usuario";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  
  const Drawer = createDrawerNavigator();
  
  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backgroundColor: "",
    },
  };

  return (
    <SafeAreaProvider style={{flex:1}}>
    <View style={{ flex: 1, backgroundColor: "#050211f2" }}>
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoWL}>WL</Text>
          <Text style={styles.logoCars}>MOTORS</Text>
        </View>
        <TouchableOpacity style={styles.reserveNavButton}>
          <Text style={styles.reserveNavButtonText}>Reserve Agora</Text>
        </TouchableOpacity>
      </View>

      <NavigationContainer theme={myTheme}>
        <Drawer.Navigator initialRouteName="Splash">
          {/* Splash - não aparece no menu e não tem ícone de menu */}
          <Drawer.Screen 
            name="Splash" 
            component={Splash} 
            options={{ 
              headerTintColor: "yellow", 
              headerTitle: '', 
              headerTransparent: true,
              drawerLabel: () => null,
              drawerItemStyle: { display: 'none' },
              swipeEnabled: false,
            }} 
          />
          
          {/* Outras telas - mantém o menu normal */}
          <Drawer.Screen 
            name="Login" 
            component={Login} 
            options={{ 
              headerTintColor: "yellow", 
              headerTitle: '', 
              headerTransparent: true,
            }} 
          />
          <Drawer.Screen 
            name="Cadastro" 
            component={Cadastro} 
            options={{ 
              headerTintColor: "yellow", 
              headerTitle: '', 
              headerTransparent: true,
            }} 
          />
          <Drawer.Screen 
            name="home" 
            component={home} 
            options={{ 
              headerTintColor: "yellow", 
              headerTitle: '', 
              headerTransparent: true,
            }} 
          />
          <Drawer.Screen 
            name="usuario" 
            component={usuario} 
            options={{ 
              headerTintColor: "yellow", 
              headerTitle: '', 
              headerTransparent: true,
            }} 
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD700",
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  logoWL: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 2,
  },
  logoCars: {
    fontSize: 16,
    color: "#fff",
    letterSpacing: 2,
    marginLeft: 5,
  },
  reserveNavButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reserveNavButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});