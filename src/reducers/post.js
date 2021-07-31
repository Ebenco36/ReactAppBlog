import {
    POST_SUCCESS,
    POST_FAIL
  } from "../actions/types";
  
  
  const initialState = {title:''};
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case POST_SUCCESS:
        return {
          ...state,
          title: payload.title,
          posted: true,
        };
      case POST_FAIL:
        return {
          ...state,
          title: payload.title,
          posted: false,
        };
      default:
        return state;
    }
  }
  