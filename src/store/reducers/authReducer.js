const initState = {
  authError: null
};

// 初期のstateを渡しとく
const authReducer = (state = initState, action) => {
  //アクションタイプを判定する
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "Login failed"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    case "SIGNUP_WITH_GOOGLE_SUCCESS":
      console.log("google!");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_WITH_GOOGLE_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    case "DELETE_USER":
      return {
        ...state,
        authError: null
      };
    case "DELETE_USER_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
