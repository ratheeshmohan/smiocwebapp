import { injectReducer } from "../../store/reducers";

export const changePasswordRoute = store => ({
  path: "changepassword",
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const ChangePassword = require("./containers/ChangePasswordContainer")
          .default;
        const reducer = require("./modules/changePassword").default;

        /*  Add the reducer to the store on key 'changePassword'  */
        injectReducer(store, { key: "changePassword", reducer });

        /*  Return getComponent   */
        cb(null, ChangePassword);

        /* Webpack named bundle   */
      },
      "changepassword"
    );
  }
});
