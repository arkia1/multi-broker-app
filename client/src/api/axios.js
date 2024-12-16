// import ReactDOM from "react-dom/client";
import axios from "axios";
// import CustomAlert from "../components/global/CustomAlert"; // Adjust the import path as needed

const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL, // Backend_URL
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  timeout: 10000, // Set the timeout to 10 seconds
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const errorMessage = error.response?.data?.message;
//     if (
//       errorMessage === "Token has expired" ||
//       errorMessage === "Invalid token"
//     ) {
//       // Trigger token expiration handling
//       handleTokenExpiration();
//     }
//     return Promise.reject(error);
//   }
// );

// const handleTokenExpiration = () => {
//   // Show alert to the user
//   const alertContainer = document.createElement("div");
//   document.body.appendChild(alertContainer);

//   const handleClose = () => {
//     const root = ReactDOM.createRoot(alertContainer);
//     root.unmount();
//     document.body.removeChild(alertContainer);
//     window.location.href = "/login";
//   };

//   const root = ReactDOM.createRoot(alertContainer);
//   root.render(<CustomAlert onClose={handleClose} />);
// };

export default axiosInstance;
