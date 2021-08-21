import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Platform } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import * as firebase from "firebase";
const DEFAULT_PHOTO =
  "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerTitleAlign: "left",
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL || DEFAULT_PHOTO,
            }}
          />
        </View>
      ),
    });
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
    return unsubscribe;
  }, [route]);
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        {/* <TouchableWithoutFeedback> */}
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Avatar
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  rounded
                  size={30}
                  source={{ uri: data.photoURL || DEFAULT_PHOTO }}
                />
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.sender}>
                <Avatar
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  rounded
                  size={30}
                  source={{ uri: data.photoURL || DEFAULT_PHOTO }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="Enter a message"
            placeholderTextColor="gray"
            style={styles.textInput}
            value={input}
            onSubmitEditing={sendMessage}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#2b68e6" />
          </TouchableOpacity>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    color: "black",
    marginRight: 15,
    paddingLeft: 15,
    color: "black",
    borderWidth: 1,
    fontSize: 18,
    borderColor: "transparent",
    backgroundColor: "#EAEAEA",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ececec",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    // fontWeight: 500,
    marginLeft: 30,
  },
  senderText: {
    color: "white",
    // fontWeight: 500,
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
