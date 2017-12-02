import { combineReducers } from "redux";
import locationReducer from "./location";
import { reducer as formReducer } from "redux-form";
import sessionReducer from "../routes/Session/modules/session";

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    form: formReducer,
    location: locationReducer,
    session: sessionReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
