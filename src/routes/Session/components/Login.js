import React from "react";
import "./Login.scss";
import { Button, Form, Input, Label, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

const renderInputField = field => (
  <Input
    {...field.input}
    type={field.type}
    required={field.required}
    placeholder={field.placeholder}
    id={field.id}
    autoFocus
  />
);

export const Login = ({ handleSubmit, onSubmit, loginErrors }) => (
  <div className="wrapper">
    <Form className="form-signin" onSubmit={handleSubmit}>
      <h3>Welcome</h3>

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
      <FormGroup check>
        <Button color="primary" size="lg" block>
          Login
        </Button>
        <a href="/resetpassword">Forgot password</a>
      </FormGroup>
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
