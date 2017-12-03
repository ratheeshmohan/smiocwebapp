import { getSession } from "../services/loginService";

// ------------------------------------
// Constants
// ------------------------------------
export const SESSION_CREATED = "SESSION_CREATED";
export const SESSION_DELETED = "SESSION_DELETED";
export const SESSION_SET_REDIRECT_URL_AFTER_SIGNIN =
  "SESSION_SET_REDIRECT_URL_AFTER_SIGNIN";

// ------------------------------------
// Actions
// ------------------------------------
export const loadSessionAsync = () => {
  return (dispatch, getState) => {
    getSession().then(
      session => {
        alert("sess");

        dispatch({
          type: SESSION_CREATED,
          token
        });
      },
      error => alert("Er")
    );
  };
};

const deleteSessionAsync = () => {
  return (dispatch, getState) => {};
};

export const actions = {
  loadSessionAsync,
  deleteSessionAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_CREATED]: (state, action) => ({
    ...state,
    token: action.acessToken
  }),

  [SESSION_DELETED]: (state, action) => ({
    ...state,
    token: ""
  }),

  [SESSION_SET_REDIRECT_URL_AFTER_SIGNIN]: (state, action) => ({
    ...state,
    redirectUrl: action.url
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: "",
  redirectUrl: ""
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
