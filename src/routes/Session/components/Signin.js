import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";
import React from "react";

const Signin = props =>
  props.forceChangePassword ? (
    <ResetPassword {...props} onSubmit={props.onForceChangePassword} />
  ) : (
    <Login {...props} onSubmit={props.onLogin} />
  );

export default Signin;
