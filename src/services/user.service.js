import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8003/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "posts/");
};

export default {
  getPublicContent
};