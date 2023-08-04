import { useState } from "react";
import { useDispatch } from "react-redux";
import { logintoAccount, createAccount } from "../reducers/authslice";
import { useCallback } from "react";
const useAuth = () => {
  const [error, seterror] = useState({ exists: false, message: "" });
  const dispatch = useDispatch();
  const resetError = useCallback(() => {
    seterror((p) => ({ exists: false, message: "" }));
  }, []);
  const hookloginHandler = useCallback((credentials, navigate) => {
    dispatch(logintoAccount(credentials))
      .unwrap()
      .then((result) => {
        console.log("Sign in successful for User  " + result);
        navigate.navigate("home");
      })
      .catch((e) => {
        console.log(e, "error");
        seterror({ exists: true, message: e });
      });
  }, []);

  const hooksignuphandler = useCallback((credentials) => {
    dispatch(createAccount(credentials))
      .unwrap()
      .then((user) => {
        Alert.alert("Success", "Your Account Has Been Created.Kindly Log In");
      })
      .catch((e) => {
        console.log("error" + e);
        seterror({ exists: true, message: e });
      });
  }, []);

  return {
    hookloginHandler,
    hooksignuphandler,
    hookautherror: error,
    resetError,
  };
};

export default useAuth;
