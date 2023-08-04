import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useInput from "../../CustomHooks/useInput";
import useAuth from "../../CustomHooks/useauth";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { useCallback } from "react";
export default function RegisterComponent({ setErrorTrue, navigate }) {
  const { inputState, changeTextHandler } = useInput({
    initialState: { name: "", email: "", password: "", cpassword: "" },
  });
  const { hooksignuphandler, resetError, hookautherror } = useAuth();
  const [validationerror,setvalidationerror]= useState({name:"",email:"",password:"",})
  const errorexists = hookautherror.exists;
  useEffect(() => {
    if (errorexists) setErrorTrue(hookautherror.message);
  }, [errorexists]);
  const submitHandler = useCallback(() => {
    //Validation
    console.log(inputState);
    if (
      !inputState.name ||
      inputState.name.length < 5 ||
      !inputState.email ||
      !inputState.email.includes("@") ||
      !inputState.password ||
      !inputState.cpassword ||
      inputState.password !== inputState.cpassword
    ) {
      console.log("wrong");
      return;
    }
    hooksignuphandler({
      name: inputState.name.trim(),
      email: inputState.email.trim(),
      password: inputState.password.trim(),
    });
    resetError();
  }, [inputState]);

  return (
    <>
      <>
        <Text style={styles.actionText}>Create New Account</Text>
        <TextInput
          placeholder="Name"
          style={styles.inputContainer}
          onChangeText={(text) => changeTextHandler("name", text)}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputContainer}
          onChangeText={(text) => changeTextHandler("email", text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputContainer}
          onChangeText={(text) => changeTextHandler("password", text)}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.inputContainer}
          onChangeText={(text) => changeTextHandler("cpassword", text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
          <Text style={styles.submitText}>Register</Text>
        </TouchableOpacity>
      </>
    </>
  );
}

const styles = StyleSheet.create({
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
