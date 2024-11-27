import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="auth-submit-button">
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
