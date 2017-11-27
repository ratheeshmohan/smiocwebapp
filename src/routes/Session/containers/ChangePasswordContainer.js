import { connect } from "react-redux";
import { changePasswordAsync } from "../modules/session";
import ChangePassword from "../components/ChangePassword";

const mapStateToProps = state => {
  return {
    initialValues: { username: state.session.username }
  };
};

const mapDispatchToProps = {
  onSubmit: values =>
    changePasswordAsync(values.username, values.password, value.newPassword)
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
