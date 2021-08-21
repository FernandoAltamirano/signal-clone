import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#2c6bed" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signout}>
            <Avatar
              rounded
              iconStyle={{ width: 30, height: 30 }}
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const signout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {chats.map(
        ({ id, data: { chatName, idUser } }) =>
          idUser === auth.currentUser.uid && (
            <CustomListItem
              key={id}
              id={id}
              chatName={chatName}
              enterChat={enterChat}
            />
          )
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
