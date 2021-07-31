import {
    POST_SUCCESS,
    POST_FAIL,
    SET_MESSAGE,
  } from "./types";
  
  import PostService from "../services/post.services";
  
  export const postBlog = (postObj) => (dispatch) => {
    return PostService.postBlog(postObj).then(
      (response) => {
        dispatch({
            type: POST_SUCCESS,
            payload: response,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: POST_FAIL,
          payload: postObj.title,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  


  export const postComment = (comment, slug, model) => (dispatch) => {
    return PostService.postComment(comment, slug, model).then(
      (response) => {
        // console.log(response)
        dispatch({
            type: POST_SUCCESS,
            payload: response
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: POST_FAIL
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  
  export const postList = (postObj) => (dispatch) => {
    return PostService.postBlog(postObj).then(
      (response) => {
        dispatch({
            type: POST_SUCCESS,
            payload: response,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: POST_FAIL,
          payload: postObj.title,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };




  export const postUpdate = (obj, slug) => (dispatch) => {
    return PostService.postUpdate(obj, slug).then(
      (response) => {
        dispatch({
            type: POST_SUCCESS,
            payload: response
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: POST_FAIL
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };



  export const deletePost = (slug) => (dispatch) => {
    return PostService.deletePost(slug).then(
      (response) => {
        dispatch({
            type: POST_SUCCESS,
            payload: response
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: POST_FAIL
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };