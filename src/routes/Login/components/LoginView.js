import React from "react";
import "./LoginView.scss";
import { Button, Form, Input, Label, FormGroup } from "reactstrap";

export const LoginView = () => (
  <div className="wrapper">
    <Form className="form-signin">
      <h2>Sign in</h2>

      <FormGroup check>
        <Label for="inputEmail" className="sr-only">
          Email address
        </Label>
        <Input
          type="email"
          name="email"
          id="inputEmail"
          placeholder="Email address"
          required
          autofocus
        />
      </FormGroup>

      <FormGroup check>
        <Label for="inputPassword" className="sr-only">
          Password
        </Label>
        <Input
          type="password"
          name="email"
          id="inputPassword"
          placeholder="Password"
          required
          autofocus
        />
      </FormGroup>

      <Button color="primary" size="lg" block>
        Login
      </Button>
      <a href="/resetpassword">Forgot password</a>
    </Form>
  </div>
);

/*(
    <div className="row">
    <div className="card card-container">
      <form className="form-signin">
        <h2 className="form-signin-heading">Sign in</h2>
        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autofocus
        />
        <label for="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  </div>
);
*/
export default LoginView;
