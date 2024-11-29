import axios from "axios";

const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL, //Backend_URL
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  timeout: 10000, // Set the timeout to 10 seconds
});

export default axiosInstance;
