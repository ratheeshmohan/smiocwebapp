import { injectReducer } from "../../store/reducers";
export const signInRoute = store => ({
  path: "signin",
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const SignIn = require("./containers/SignInContainer").default;
        const reducer = require("./modules/signin").default;

        /*  Add the reducer to the store on key 'signin'  */
        injectReducer(store, { key: "signin", reducer });

        /*  Return getComponent   */
        cb(null, SignIn);

        /* Webpack named bundle   */
      },
      "signin"
    );
  }
});