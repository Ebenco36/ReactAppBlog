import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8003/api/";


const posts = () => {
    return axios.get(API_URL + "posts/")
      .then((response) => {
        return response.data.results;
      });
};


const post = (slug) => {
  return axios.get(API_URL + "posts/"+slug+'/', { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


const deletePost = (slug) => {
  return axios.delete(API_URL + "posts/"+slug+'/delete', { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


const postBlog = (postObj) => {
  return axios.post(API_URL + "posts/create/", {
        title: postObj.title,
        content: postObj.content,
        publish: postObj.publish
    },{ headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


const postUpdate = (postObj, slug) => {
  return axios.patch(API_URL + "posts/"+slug+'/edit', {
        title: postObj.title,
        content: postObj.content,
        publish: postObj.publish
    },{ headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


const postComment = (comment, slug, model) => {
  return axios.post(API_URL + "comments/create/?type="+model+"&slug="+slug, {
      content: comment.comment
    }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};




export default {
  post,
  posts,
  postBlog,
  postUpdate,
  deletePost,
  postComment
};
