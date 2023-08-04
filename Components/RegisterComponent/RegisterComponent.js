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
import { Formik } from "formik";
import * as Yup from "yup";
export default function RegisterComponent({ setErrorTrue, navigate }) {
  const { inputState, changeTextHandler } = useInput({
    initialState: { name: "", email: "", password: "", cpassword: "" },
  });
  const { hooksignuphandler, resetError, hookautherror } = useAuth();

  const errorexists = hookautherror.exists;
  useEffect(() => {
    if (errorexists) setErrorTrue(hookautherror.message);
  }, [errorexists]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Password must be at least 8 characters"),
    cpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const submitHandler = useCallback(
    (val) => {
      console.log("th", val);
      hooksignuphandler({
        name: val.name.trim(),
        email: val.email.trim(),
        password: val.password.trim(),
      });
      resetError();
    },
    [inputState]
  );
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.actionText}>Create Your Account</Text>
      <Formik
        initialValues={inputState}
        validationSchema={validationSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View>
            <TextInput
              placeholder="Name"
              style={styles.inputContainer}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              placeholder="Email"
              style={styles.inputContainer}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
              style={styles.inputContainer}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              placeholder="Confirm Password"
              style={styles.inputContainer}
              onChangeText={handleChange("cpassword")}
              onBlur={handleBlur("cpassword")}
              value={values.cpassword}
              secureTextEntry
            />
            {touched.cpassword && errors.cpassword && (
              <Text style={styles.error}>{errors.cpassword}</Text>
            )}

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
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
  error: {
    color: "red",
  },
});
