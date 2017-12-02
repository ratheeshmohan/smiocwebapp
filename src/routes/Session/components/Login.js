import React from "react";
import "./Login.scss";
import { Button, Form, Input, Label, Alert, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { renderInputField } from "../../../shared/reduxFormHelper";

export const Login = ({ handleSubmit, onSubmit, loginErrors }) => (
  <div className="wrapper">
    <Form className="form-signin" onSubmit={handleSubmit}>
      <h4>Welcome</h4>
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
          placeholder="Password"
          required
          autoFocus
          component={renderInputField}
        />
      </FormGroup>
      {loginErrors && <div className="feedback-error">{loginErrors}</div>}
      <FormGroup check className="action-group">
        <Button color="primary" size="lg" block>
          Login
        </Button>
        <a href="/resetpassword">Forgot password</a>
      </FormGroup>
      <Alert color="info">
        If you need a new logn, please contact <b>smioc.sydney@gmail.com</b>
      </Alert>
    </Form>
  </div>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  // a unique name for the form
  form: "login"
})(Login);
