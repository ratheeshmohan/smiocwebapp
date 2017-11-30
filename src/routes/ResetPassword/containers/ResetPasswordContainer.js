import { connect } from "react-redux";
import {
  resetPasswordAsync,
  resetPasswordConfirmAsync
} from "../modules/resetPassword";
import ResetPassword from "../components/ResetPassword";

const mapStateToProps = state => ({
  errorMessage: state.resetPassword.errorMessage,
  showResetPasswordConfirm:
    state.resetPassword.status == "RESET_PASSWORD_CONFIRMATION_REQUIRED"
});

const mapDispatchToProps = {

  onResetPassword: values => resetPasswordAsync(values.email),

  onResetPasswordConfirm: values =>
    resetPasswordConfirmAsync(
      values.email,
      values.verificationCode,
      values.newPassword
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
