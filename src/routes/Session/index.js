import { injectReducer } from "../../store/reducers";
import  SignInContainer from "./containers/SignInContainer";

export const signInRoute = store => ({
  path: "signin",
  component: SignInContainer
});
