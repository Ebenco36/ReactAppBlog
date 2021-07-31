import axios from "axios";

const API_URL = "http://127.0.0.1:8003/api/";

const register = (user) => {
  return axios.post(API_URL + "users/register/", {
    email: user.email,
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "users/login/", {
      email:email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
