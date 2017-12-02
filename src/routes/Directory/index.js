import { injectReducer } from "../../store/reducers";
import  DirectoryContainer from "./containers/DirectoryContainer";

export const directoryRoute = store => ({
  path: "directory",
  component: DirectoryContainer
});
