import React from "react";
import "./ChangePassword.scss";
import { Button, Form, Input, Label, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { renderInputField } from "../../../shared/reduxFormHelper";

export const ChangePassword = ({ handleSubmit, onSubmit, changeStatus }) => (
  <div className="wrapper">
    <Form className="form-signin" onSubmit={handleSubmit}>
      <h4>Change password</h4>
      <FormGroup check>
        <Label for="inputUsername" className="sr-only">
          Email address
        </Label>
        <Field
          type="email"
          name="username"
          id="inputUsername"
          placeholder="Email address"
          required
          autoFocus
          component={renderInputField}
        />
      </FormGroup>

      <FormGroup check>
        <Label for="inputPassword" className="sr-only">
          Password
        </Label>

        <Field
          type="password"
          name="password"
          id="inputPassword"
          placeholder="Enter current password"
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
        <Label for="inputRenterNewPassword" className="sr-only">
          Reenter new password
        </Label>

        <Field
          type="password"
          name="renterNewPassword"
          id="inputRenterNewPassword"
          placeholder="Re-enter new password"
          required
          autoFocus
          component={renderInputField}
        />
      </FormGroup>

      {changeStatus == "failure" && (
        <div className="feedback-error">
          Failed to change password. TODO: Add passwod policy{" "}
        </div>
      )}
      {changeStatus == "success" && (
        <div className="feedback-success"> Password changed successfully!</div>
      )}

      <FormGroup check>
        <Button color="primary" size="lg" block>
          Change
        </Button>
      </FormGroup>
    </Form>
  </div>
);

ChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  // a unique name for the form
  form: "changepassword"
})(ChangePassword);
