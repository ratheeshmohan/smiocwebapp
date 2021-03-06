import React from "react";
import "./Login.scss";
import { Button, Form, Label, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { renderInputField } from "../../../shared/reduxFormHelper";

const ForceChangePassword = ({ handleSubmit, onSubmit, loginErrors }) => (
  <div className="wrapper">
    <Form className="form-signin" onSubmit={handleSubmit}>
      <h3>Reset password</h3>
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
          disabled
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
          placeholder="New password"
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

      {loginErrors && <div className="feedback-error">{loginErrors}</div>}
      <FormGroup check>
        <Button color="primary" size="lg" block>
          Change password
        </Button>
      </FormGroup>
    </Form>
  </div>
);

ForceChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  // a unique name for the form
  form: "forceChangePassword"
})(ForceChangePassword);
