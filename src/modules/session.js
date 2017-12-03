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
const loadSessionFromLocalStoreAsync = () => {
  return (dispatch, getState) => {
    getSession().then(
      result => {
        dispatch({
          type: SESSION_CREATED,
          token: result.token,
          user: result.user
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
  loadSessionFromLocalStoreAsync,
  deleteSessionAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_CREATED]: (state, action) => ({
    ...state,
    token: action.token,
    user: action.user
  }),

  [SESSION_DELETED]: (state, action) => ({
    ...state,
    token: "",
    user: null
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
  redirectUrl: "",
  user: null
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
