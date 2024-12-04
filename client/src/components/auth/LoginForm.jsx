import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "axios"; // Add axios for API requests

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "", // Changed email to username
    password: "",
  });

  const [error, setError] = useState(""); // To handle error messages
  const [success, setSuccess] = useState(""); // To handle success message
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message on each submit attempt
    setSuccess(""); // Reset success message on each submit attempt

    try {
      // Make a POST request to the backend login API
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );

      // Handle success (store JWT token or redirect, etc.)
      const { access_token } = response.data;
      console.log("Access Token:", access_token);

      // Optionally store the token (localStorage, state, or context)
      localStorage.setItem("access_token", access_token);

      // Set success message
      setSuccess("Login successful! Redirecting...");

      // Optionally, redirect after successful login
      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect to another page if needed
      }, 2000);
    } catch (err) {
      setError("Invalid credentials, please try again.");
      console.error("Login error:", err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label htmlFor="username" className="auth-input-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="auth-input"
            placeholder="Your Username"
          />
        </div>
        <div>
          <label htmlFor="password" className="auth-input-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
            placeholder="Your Password"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {success && <div className="text-green-500 text-sm">{success}</div>}

        <button
          type="submit"
          className="auth-submit-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <a href="/register" className="text-indigo-500 text-sm">
        Don&apos;t have an account ? click here!
      </a>
    </AuthLayout>
  );
};

export default LoginForm;
