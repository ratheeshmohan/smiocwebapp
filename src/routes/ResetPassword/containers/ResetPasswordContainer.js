import { connect } from "react-redux";
import { resetPasswordAsync } from "../modules/resetPassword";
import ResetPassword from "../components/ResetPassword";

 
const mapDispatchToProps = {
  onSubmit: values =>
  resetPasswordAsync(values.email)
};

export default connect(null, mapDispatchToProps)(ResetPassword);
