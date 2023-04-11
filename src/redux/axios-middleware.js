import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default axios;