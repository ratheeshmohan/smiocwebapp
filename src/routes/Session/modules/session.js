import {
  login,
  completeNewPasswordChallenge,
  changePassword
} from "../../../services/loginService";
import { browserHistory } from "react-router";

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_ASYNC = "LOGIN_ASYNC";
export const LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_REQUIRED =
  "LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_REQUIRED";
export const LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_FAILED =
  "LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_FAILED";
export const LOGIN_ASYNC_FAILED = "LOGIN_ASYNC_FAILED";
export const LOGIN_ASYNC_SUCCEED = "LOGIN_ASYNC_SUCCEED";

// ------------------------------------
// Actions
// ------------------------------------
export const loginAsync = (username, password) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN_ASYNC,
      username,
      password
    });

    login(username, password, {
      onSuccess: function(result) {
        dispatch({
          type: LOGIN_ASYNC_SUCCEED,
          acessToken: result.idToken.jwtToken
        });
      },
      onFailure: function(err) {
        dispatch({
          type: LOGIN_ASYNC_FAILED,
          error: err.message
        });
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        dispatch({
          type: LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_REQUIRED,
          username
        });
      }
    });
  };
};

export const forceChangePasswordAsync = (username, newPassword) => {
  return (dispatch, getState) => {
    var originalPassword = getState().session.password;

    completeNewPasswordChallenge(username, originalPassword, newPassword, {
      onSuccess: function(result) {
        dispatch({
          type: LOGIN_ASYNC_SUCCEED,
          acessToken: result.idToken.jwtToken
        });
      },
      onFailure: function(err) {
        dispatch({
          type: LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_FAILED,
          error: err.message
        });
      }
    });
  };
};

export const changePasswordAsync = (username, password, newPassword) => {
  return (dispatch, getState) => {
    changePassword(username, password, newPassword);
    //TODO
  };
};

export const actions = {
  loginAsync,
  changePasswordAsync,
  forceChangePasswordAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_ASYNC]: (state, action) => ({
    ...state,
    username: action.username,
    password: action.password,
    sessionStatus: "SESSION_ESTABLISHMENT_IN_PROGRESS",
    errorMessage: ""
  }),

  [LOGIN_ASYNC_FAILED]: (state, action) => ({
    ...state,
    sessionStatus: "SESSION_ESTABLISHMENT_FAILED",
    errorMessage: action.error
  }),

  [LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_REQUIRED]: (state, action) => ({
    ...state,
    sessionStatus: "SESSION_ESTABLISHMENT_IN_PROGRESS_RESET_PASSWORD",
    errorMessage: ""
  }),
  [LOGIN_ASYNC_FORCE_CHANGE_PASSWORD_FAILED]: (state, action) => ({
    ...state,
    sessionStatus: "SESSION_ESTABLISHMENT_IN_PROGRESS_RESET_PASSWORD_FAILED",
    errorMessage: action.error
  }),
  [LOGIN_ASYNC_SUCCEED]: (state, action) => ({
    ...state,
    sessionStatus: "SESSION_ESTABLISHMENT_SUCCEED",
    sessionToken: action.acessToken,
    errorMessage: "",
    password: ""
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username: "",
  password: "",
  sessionToken: "",
  sessionStatus: "",
  errorMessage: ""
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
