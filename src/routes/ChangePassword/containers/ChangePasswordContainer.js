import { connect } from "react-redux";
import { changePasswordAsync } from "../modules/changePassword";
import ChangePassword from "../components/ChangePassword";

const mapStateToProps = state => {
  let changeStatus = "";
  if (state.changePassword.status == "CHANGE_PASSWORD_SUCCEED") {
    changeStatus = "success";
  } else if (state.changePassword.status == "CHANGE_PASSWORD_SUCCEED") {
    changeStatus = "failure";
  }
  return {
    changeStatus
    // initialValues: { username: state.session.username } //TOEnable
  };
};

const mapDispatchToProps = {
  onSubmit: values =>
    changePasswordAsync(values.username, values.password, values.newPassword)
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
