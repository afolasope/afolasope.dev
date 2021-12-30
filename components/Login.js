import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import Alert from "./Alert";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAlert({
          message: "Logged in successfully",
          type: "success",
        });
      })
      .catch((error) => {
        setAlert({
          message: error.message,
          type: "danger",
        });
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="container">
        <form onSubmit={login}>
          <br />
          <h3>Please login</h3>
          <br />
          <MDBInput
            label="Email"
            id="typeEmail"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <MDBInput
            label="Password"
            id="typePassword"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <MDBInput type="submit" value="Login" />
        </form>
        <br />
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            close={() => {
              setAlert(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Login;
