import { connect } from "react-redux";
import {
  resetPasswordAsync,
  resetPasswordConfirmAsync
} from "../modules/resetPassword";
import ResetPassword from "../components/ResetPassword";

const mapStateToProps = state => ({
  errorMessage: state.resetPassword.errorMessage,
  resetSuccess: state.resetPassword.status == "RESET_PASSWORD_SUCCEED",
  showResetPasswordConfirm:
    ["RESET_PASSWORD_FAILED", "RESET_PASSWORD_CONFIRMATION_REQUIRED"].indexOf(
      state.resetPassword.status
    ) >= 0
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
