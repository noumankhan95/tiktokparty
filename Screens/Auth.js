import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  Button,
} from "react-native";
import useInput from "../CustomHooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { logintoAccount, createAccount } from "../reducers/authslice";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";
import Card from "../Components/Card/Card";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import { useCallback } from "react";
import { useRoute } from "@react-navigation/native";
export default function Auth({ navigation }) {
  const [authmode, setauthmode] = useState(0);
  const isloading = useSelector((state) => state.auth.isloading);
  const [isError, setisError] = useState({ exists: false, message: "" });
  const setErrorTrue = useCallback((m) => {
    setisError((p) => ({ exists: true, message: m }));
  }, []);
  const closeCard = useCallback(() => {
    setisError((p) => ({ exists: false, message: "" }));
  }, []);
  const changeAuthModeHandler = useCallback(() => {
    console.log("auth change");
    setauthmode((p) => (authmode === 0 ? 1 : 0));
  }, [authmode]);
  const callmefunc = httpsCallable(functions, "callmefunction");
  // const { error } = useRoute();
  console.log(authmode);
  return (
    <View style={styles.container}>
      {isloading && (
        <Card dontshowclose={true}>
          <Text style={{ fontSize: 20 }}>This will only Take a moment</Text>
          <ActivityIndicator size={70} />
        </Card>
      )}
      {isError.exists && (
        <Card closeCard={closeCard} dontshowclose={false}>
          <Text style={{ fontSize: 20, color: "red" }}>{isError.message}</Text>
        </Card>
      )}
      <ImageBackground
        source={require("../assets/logomain.png")}
        style={styles.headerImg}
      >
        <Text style={styles.headertext}>TIKTOK PARTY</Text>
      </ImageBackground>
      <KeyboardAvoidingView
        style={styles.authContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={-390}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.authContainer}>
            {authmode === 0 && (
              <RegisterComponent
                navigate={navigation}
                setErrorTrue={setErrorTrue}
              />
            )}
            {authmode === 1 && (
              <LoginComponent
                navigate={navigation}
                setErrorTrue={setErrorTrue}
              />
            )}
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "skyblue" }}
              onPress={changeAuthModeHandler}
            >
              {authmode === 0 ? "Login Instead" : "SignUp Instead"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerImg: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 30,
  },
  headertext: {
    color: "white",
    fontSize: 30,
    // fontWeight: "bold",
    position: "absolute",
    // marginTop: 170,
    zIndex: 4,
  },
  authContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  actionText: { textAlign: "center", fontSize: 25, marginVertical: 10 },
  inputContainer: {
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },
  submitBtn: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  submitText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
