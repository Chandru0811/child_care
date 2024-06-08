// api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://13.213.208.92:8081/ecschild/api",
  // baseURL: "https://artylearning.com/artylearning/api/",
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmVtQDIwMjQiLCJpYXQiOjE3MTc1Njk5MDcsImV4cCI6MTcyMjc1MzkwN30.PP-HiKeRpUQ0NEKaXvhgtiCHyOtf0r6dYhhMHhE56he2StCa9yfmo4vZI2IwU3V8natChVVh1fHL3OPcbtqMjg";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
