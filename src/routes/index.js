// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/PageLayout/PageLayout";
import Home from "./Home";
import { signInRoute } from "./Signin";
import { changePasswordRoute } from "./ChangePassword";
import { resetPasswordRoute } from "./ResetPassword";
import { directoryRoute } from "./Directory";
import AuthenticatedRoute from "../containers/AuthenticatedRoute";

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const noAuthRoutes = store => [
  signInRoute(store),
  changePasswordRoute(store),
  resetPasswordRoute(store)
];

const authRoutes = store => ({
  path: "/",
  component: AuthenticatedRoute,
  childRoutes: [directoryRoute(store)]
});

export const createRoutes = store => ({
  path: "/",
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [...noAuthRoutes(store), authRoutes(store)]
});

export default createRoutes;
