import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { auth, db } from "../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      //   headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    // console.log(auth.currentUser.uid);
    db.collection("chats")
      .add({
        chatName: input,
        idUser: auth.currentUser.uid,
      })
      .then(() => navigation.goBack())
      .catch((err) => alert(err.message));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Create chat" />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
