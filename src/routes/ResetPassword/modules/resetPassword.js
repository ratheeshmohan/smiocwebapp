import {
  resetPassword as resetLoginPassword,
  resetPasswordConfirm
} from "../../../services/loginService";
import { browserHistory } from "react-router";

// ------------------------------------
// Constants
// ------------------------------------
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_CONFIRM = "RESET_PASSWORD_CONFIRM";
export const RESET_PASSWORD_CONFIRM_IN_PROGRESS =
  "RESET_PASSWORD_CONFIRM_IN_PROGRESS";

export const RESET_PASSWORD_SUCCEED = "RESET_PASSWORD_SUCCEED";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

// ------------------------------------
// Actions
// ------------------------------------
export const resetPasswordAsync = email => (dispatch, getState) => {
  dispatch({
    type: RESET_PASSWORD,
    email
  });

  resetLoginPassword(email, {
    onSuccess: result => {},
    onFailure: err => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        errorMessage: err.message
      });
    },
    inputVerificationCode: () => {
      dispatch({
        type: RESET_PASSWORD_CONFIRM
      });
    }
  });
};

export const resetPasswordConfirmAsync = (
  email,
  verificationCode,
  password
) => (dispatch, getState) => {
  
  dispatch({
    type: RESET_PASSWORD_CONFIRM_IN_PROGRESS,
    email
  });

  resetPasswordConfirm(email, verificationCode, password, {
    onFailure: err => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        errorMessage: err.message
      });
    },
    onSuccess: () => {
      dispatch({
        type: RESET_PASSWORD_SUCCEED
      });
    }
  });
};

export const actions = {
  resetPasswordAsync,
  resetPasswordConfirmAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RESET_PASSWORD]: (state, action) => ({
    ...state,
    email: action.email,
    status: "RESET_PASSWORD_IN_PROGRESS",
    errorMessage: ""
  }),

  [RESET_PASSWORD_SUCCEED]: (state, action) => ({
    ...state,
    email: action.email,
    status: "RESET_PASSWORD_SUCCEED",
    errorMessage: ""
  }),

  [RESET_PASSWORD_FAILED]: (state, action) => ({
    ...state,
    email: action.email,
    status: "RESET_PASSWORD_FAILED",
    errorMessage: action.errorMessage
  }),

  [RESET_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    email: action.email,
    status: "RESET_PASSWORD_CONFIRMATION_REQUIRED"
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  email: "",
  errorMessage: ""
};

export default function changePassword(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
