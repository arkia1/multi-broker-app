import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout"; // Ensure this component is set up correctly

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(""); // State to manage error messages
  const [success, setSuccess] = useState(""); // State to manage success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("User registered successfully!"); // Display success message
        console.log("User registered:", data);
        setFormData({ name: "", email: "", password: "" }); // Reset form
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during registration.");
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      description="Create a new account to get started."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <div>
          <label htmlFor="username" className="auth-input-label">
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.name}
            onChange={handleChange}
            required
            className="auth-input"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="auth-input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
            placeholder="you@example.com"
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
        <button
          type="submit"
          className={`auth-submit-button ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignupForm;
