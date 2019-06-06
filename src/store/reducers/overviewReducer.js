const initState = {};

const overviewReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_OVERVIEW":
      return state;
    case "CREATE_OVERVIEW_ERROR":
      return state;
    case "EDIT_OVERVIEW":
      return state;
    case "EDIT_OVERVIEW_ERROR":
      return state;
    case "DELETE_OVERVIEW":
      return state;
    case "DELETE_OVERVIEW_ERROR":
      return state;
    default:
      return state;
  }
};

export default overviewReducer;
