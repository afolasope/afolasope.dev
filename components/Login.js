import { getAuth, signInWithPopup } from "@firebase/auth";
import React from "react";
import { provider } from "../firebase";

const Login = () => {
  const auth = getAuth();
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  return <div className="container login">Login</div>;
};

export default Login;
