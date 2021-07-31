import axios from "axios";

const API_URL = "http://127.0.0.1:8003/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "posts/");
};

export default {
  getPublicContent
};