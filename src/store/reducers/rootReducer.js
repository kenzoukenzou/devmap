import authReducer from "./authReducer";
import overviewReducer from "./overviewReducer";
import stepReducer from "./stepReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  // set property
  auth: authReducer,
  overview: overviewReducer,
  step: stepReducer,
  firestore: firestoreReducer, // @@ ①Resposible for sycing our data
  firebase: firebaseReducer
});

export default rootReducer;
