import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      authUser && navigation.replace("Home");
    });
    return unsubscribe;
  }, []);
  const signin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
  };
  const navigateToRegister = () => navigation.navigate("Register");
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onSubmitEditing={signin}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onSubmitEditing={signin}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signin} title="Login" />
      <Button
        containerStyle={styles.button}
        type="outline"
        onPress={navigateToRegister}
        title="Register"
      />
      <View style={{ height: 10 }} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
