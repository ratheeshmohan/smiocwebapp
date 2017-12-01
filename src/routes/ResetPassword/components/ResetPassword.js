import React from "react";
import {
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Alert,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import "./ResetPassword.scss";

const renderInputField = field => <Input {...field.input} {...field} />;

const ResetPassword = ({
  handleSubmit,
  showResetPasswordConfirm,
  errorMessage,
  onResetPasswordConfirm,
  onResetPassword,
  resetSuccess
}) => (
  <div className="wrapper">
    {resetSuccess
      ? ResetSuccess()
      : ResetProcess(
          handleSubmit,
          showResetPasswordConfirm,
          errorMessage,
          onResetPasswordConfirm,
          onResetPassword
        )}
  </div>
);

const ResetProcess = (
  handleSubmit,
  showResetPasswordConfirm,
  errorMessage,
  onResetPasswordConfirm,
  onResetPassword
) => (
  <Form className="form-signin" onSubmit={handleSubmit}>
    <h4>Trouble signing in?</h4>
    <FormGroup check>
      <Field
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email address"
        required
        autoFocus
        readOnly={showResetPasswordConfirm}
        component={renderInputField}
      />
    </FormGroup>
    {showResetPasswordConfirm && (
      <div>
        <Alert color="primary">
          A verification code has been sent to your above email. Please enter
          details below and reset your password.
        </Alert>
        <FormGroup check>
          <Label for="inputVerificationCode" className="sr-only">
            Reset code
          </Label>
          <Field
            type="text"
            name="verificationCode"
            id="inputVerificationCode"
            placeholder="Verification code"
            required
            autoFocus
            component={renderInputField}
          />
        </FormGroup>

        <FormGroup check>
          <Label for="inputNewPassword" className="sr-only">
            New password
          </Label>
          <Field
            type="password"
            name="newPassword"
            id="inputNewPassword"
            placeholder="Enter new password"
            required
            autoFocus
            component={renderInputField}
          />
        </FormGroup>

        <FormGroup check>
          <Label for="inputConfirmNewPassword" className="sr-only">
            New password
          </Label>
          <Field
            type="password"
            name="confirmPassword"
            id="inputConfirmNewPassword"
            placeholder="Re-enter new password"
            required
            autoFocus
            component={renderInputField}
          />
        </FormGroup>
      </div>
    )}
    {errorMessage && <div className="feedback-error">{errorMessage}</div>}
    <FormGroup check>
      <Button
        color="primary"
        size="lg"
        block
        onClick={handleSubmit(
          values =>
            showResetPasswordConfirm
              ? onResetPasswordConfirm(values)
              : onResetPassword(values)
        )}
      >
        Reset password
      </Button>
    </FormGroup>
  </Form>
);

const ResetSuccess = () => (
  <FormGroup>
    <p>Paswword reseted successfully!</p>
    <NavLink href="/signin">Continue signing in</NavLink>
  </FormGroup>
);

ResetPassword.propTypes = {
  onResetPasswordConfirm: PropTypes.func.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  // a unique name for the form
  form: "resetPassword"
})(ResetPassword);
