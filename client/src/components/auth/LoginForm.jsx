import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import axiosInstance from "../../api/axios"; // Use the Axios instance with interceptor

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/login", formData);
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
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
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button type="submit" className="auth-submit-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <a href="/register" className="text-indigo-500 text-sm">
        Don&apos;t have an account? Click here!
      </a>
    </AuthLayout>
  );
};

export default LoginForm;
