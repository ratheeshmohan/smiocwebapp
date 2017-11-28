import Login from "../components/Login";
import ForceChangePassword from "../components/ForceChangePassword";
import React from "react";

const Signin = props =>
  props.forceChangePassword ? (
    <ForceChangePassword {...props} onSubmit={props.onForceChangePassword} />
  ) : (
    <Login {...props} onSubmit={props.onLogin} />
  );

export default Signin;
