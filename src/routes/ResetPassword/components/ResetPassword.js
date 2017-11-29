import React from "react";
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

export const ResetPassword = ({ handleSubmit, onSubmit, changeStatus }) => (
  <div className="wrapper">
    <Form className="form-signin" onSubmit={handleSubmit}>
      <h2>Reset password</h2>
      <FormGroup check>
        <Label for="inputUsername">Enter your email address</Label>
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          required
          autoFocus
          component={renderInputField}
        />
      </FormGroup>
      <FormGroup check>
        <Button color="primary" size="lg" block>
          Reset password
        </Button>
      </FormGroup>
    </Form>
  </div>
);

ResetPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  // a unique name for the form
  form: "resetPassword"
})(ResetPassword);
