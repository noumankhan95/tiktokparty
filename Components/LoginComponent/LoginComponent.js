import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useInput from "../../CustomHooks/useInput";
import { logintoAccount } from "../../reducers/authslice";
import Card from "../Card/Card";
import { useEffect } from "react";
import useAuth from "../../CustomHooks/useauth";
import { useCallback } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

export default function LoginComponent({ navigate, setErrorTrue }) {
  const { inputState, changeTextHandler } = useInput({
    initialState: { email: "", password: "" },
  });
  const { hookloginHandler, hookautherror, resetError } = useAuth();
  const errorexists = hookautherror.exists;
  useEffect(() => {
    if (errorexists) setErrorTrue(hookautherror.message);
  }, [errorexists]);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitHandler = useCallback((val) => {
    hookloginHandler(
      {
        email: val.email.trim(),
        password: val.password.trim(),
      },
      navigate
    );
    resetError();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={inputState}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          submitHandler(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ flex: 1 }}>
            <Text style={styles.actionText}>Login To Your Account</Text>
            <TextInput
              placeholder="Email"
              style={styles.inputContainer}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              placeholder="Password"
              style={styles.inputContainer}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Log In</Text>
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
  errorText: { color: "red" },
});
