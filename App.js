import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Login from "./page/login";
import Cadastro from "./page/cadastro";
import Splash from "./page/splash";
import Cep from "./page/cep";
import Home from "./page/home";
import Lista from "./page/gustavo";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerTintColor: "white" }}
      >
        <Drawer.Screen
          name="Splash"
          component={Splash}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerSearchBarOptions: false,
            drawerLabel: () => null,
            drawerItemStyle: { display: "none" },
            swipeEnabled: false,
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerSearchBarOptions: false,
          }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerSearchBarOptions: false,
          }}
        />
        <Drawer.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerSearchBarOptions: false,
          }}
        />
        <Drawer.Screen
          name="Cep"
          component={Cep}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerSearchBarOptions: false,
          }}
        />
        <Drawer.Screen
          name="Lista"
          component={Lista}
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerSearchBarOptions: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
