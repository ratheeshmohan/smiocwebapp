import { connect } from "react-redux";
import { loginAsync, forceChangePasswordAsync } from "../modules/signin";
import Signin from "../components/Signin";
import { CostExplorer } from "aws-sdk";

const mapStateToProps = state => {
  return {
    loginErrors: state.signin.errorMessage,
    forceChangePassword:
      [
        "SIGNIN_IN_PROGRESS_RESET_PASSWORD",
        "SIGNIN_IN_PROGRESS_RESET_PASSWORD_FAILED"
      ].indexOf(state.signin.status) > -1
  };
};

const mapDispatchToProps = {
  onLogin: values => loginAsync(values.username, values.password),
  onForceChangePassword: values =>
    forceChangePasswordAsync(values.username, values.newPassword)
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
