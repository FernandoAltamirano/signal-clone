import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
const Register = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerBackTitle: "Back to Login",
  //     });
  //   }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // console.log(authUser);
        authUser.user.updateProfile({
          displayName: fullname,
          photoURL: imageURL,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          onSubmitEditing={register}
          value={fullname}
          onChangeText={(text) => setFullname(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          onSubmitEditing={register}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          onSubmitEditing={register}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Image Url (optional)"
          type="text"
          value={imageURL}
          onSubmitEditing={register}
          onChangeText={(text) => setImageURL(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
      />
    </View>
  );
};

export default Register;

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
    marginTop: 20,
  },
});
