import { changePassword as changeLoginPassword } from "../../../services/loginService";
import { browserHistory } from "react-router";

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_SUCCEED = "CHANGE_PASSWORD_SUCCEED";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";

// ------------------------------------
// Actions
// ------------------------------------
export const changePasswordAsync = (username, password, newPassword) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CHANGE_PASSWORD,
    username
  });

  changeLoginPassword(username, password, newPassword, (err, res) => {
    if (err) {
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        username,
        errorMessage: "Failed to change password."
      });
    } else {
      dispatch({
        type: CHANGE_PASSWORD_SUCCEED,
        username
      });
    }
  });
};

export const actions = {
  changePasswordAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_PASSWORD]: (state, action) => ({
    ...state,
    username: action.username,
    status: "CHANGE_PASSWORD_IN_PROGRESS",
    errorMessage: ""
  }),

  [CHANGE_PASSWORD_SUCCEED]: (state, action) => ({
    ...state,
    username: action.username,
    status: "CHANGE_PASSWORD_SUCCEED",
    errorMessage: ""
  }),

  [CHANGE_PASSWORD_FAILED]: (state, action) => ({
    ...state,
    username: action.username,
    status: "CHANGE_PASSWORD_FAILED",
    errorMessage: action.errorMessage
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username: "",
  errorMessage: ""
};

export default function changePassword(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
