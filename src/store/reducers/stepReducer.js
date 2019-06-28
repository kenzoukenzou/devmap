const initState = {};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_STEP":
      return state;
    case "CREATE_STEP_ERROR":
      return state;
    case "DELETE_STEP":
      return state;
    case "DELETE_STEP_ERROR":
      return state;
    case "EDIT_STEP":
      return state;
    case "EDIT_STEP_ERROR":
      return state;
    default:
      return state;
  }
};

export default commentReducer;
