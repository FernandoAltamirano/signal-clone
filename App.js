import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { LogBox } from "react-native";
import AddChat from "./screens/AddChat";
import Chat from "./screens/Chat";
LogBox.ignoreLogs(["Setting a timer"]);

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Home"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen
          component={Login}
          name="Login"
          options={{
            title: "Lets sign up",
          }}
        />
        <Stack.Screen
          component={Register}
          name="Register"
          options={{
            title: "Register",
          }}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          component={AddChat}
          name="AddChat"
          options={{
            title: "New Chat",
          }}
        />
        <Stack.Screen
          component={Chat}
          name="Chat"
          options={{
            title: "Chat",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
