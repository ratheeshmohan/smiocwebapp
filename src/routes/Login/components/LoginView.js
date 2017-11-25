import React from "react";
import "./LoginView.scss";

export const LoginView = () => (
  <div className="wrapper">
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
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Login
      </button>
      <a href="/resetpassword">Forgot password</a>
    </form>
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
