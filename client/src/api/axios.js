import axios from "axios";

const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL, //Backend_URL
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  timeout: 10000, // Set the timeout to 10 seconds
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      const errorMessage = error.response.data.detail;
      if (
        errorMessage === "Token has expired" ||
        errorMessage === "Invalid token"
      ) {
        // Trigger token expiration handling
        handleTokenExpiration();
      }
    }
    return Promise.reject(error);
  }
);

const handleTokenExpiration = () => {
  // Show alert to the user
  alert("Your session has expired. Please log in again.");
  // Redirect to login page
  window.location.href = "/login";
};

export default axiosInstance;
