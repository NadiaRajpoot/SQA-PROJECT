// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // 👈 your backend URL
  withCredentials: true, // if you're using cookies for auth
});

export default axiosInstance;
