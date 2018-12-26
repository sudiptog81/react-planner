const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, authError: null };
    case "LOGIN_ERROR":
      return { ...state, authError: "Login Failed" };
    case "SIGNOUT_SUCCESS":
      return { ...state, authError: null };
    case "SIGNUP_SUCCESS":
      return { ...state, authError: null };
    case "SIGNUP_ERROR":
      return { ...state, authError: action.err.message };
    case "RESET_SUCCESS":
      return { ...state, authError: null };
    case "RESET_ERROR":
      return { ...state, authError: action.err.message };
    case "DELETEAC_SUCCESS":
      return { ...state, authError: null };
    case "DELETEAC_ERROR":
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};
export default authReducer;
