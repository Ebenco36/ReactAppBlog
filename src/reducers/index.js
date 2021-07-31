  import { combineReducers } from "redux";
  import auth from "./auth";
  import post from "./post";
  import message from "./message";

  export default combineReducers({
    auth,
    message,
    post
  });
