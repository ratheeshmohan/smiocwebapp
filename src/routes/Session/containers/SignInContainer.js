import { connect } from "react-redux";
import { loginAsync, forceChangePasswordAsync } from "../modules/session";
import Signin from "../components/Signin";
import { CostExplorer } from "aws-sdk";

const mapStateToProps = state => {
  return {
    loginErrors: state.session.errorMessage,
    forceChangePassword:
      [
        "SESSION_ESTABLISHMENT_IN_PROGRESS_RESET_PASSWORD",
        "SESSION_ESTABLISHMENT_IN_PROGRESS_RESET_PASSWORD_FAILED"
      ].indexOf(state.session.sessionStatus) > -1
  };
};

const mapDispatchToProps = {
  onLogin: values => loginAsync(values.username, values.password),
  onForceChangePassword: values =>
    forceChangePasswordAsync(values.username, values.newPassword)
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
