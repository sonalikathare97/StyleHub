import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        formData.email.trim().toLowerCase()
    );

    if (existingUser) {
      alert("Email already registered. Please login.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email.trim(),
      password: formData.password
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    // Set login status
    localStorage.setItem("isLoggedIn", "true");

    // Save current user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: newUser.name,
        email: newUser.email
      })
    );

    alert("Registration successful!");

    const destination = location.state?.from || "/";

    navigate(destination);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Create Account</h2>
        <p>Join STYLEHUB and start shopping</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">REGISTER</button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{
              from: location.state?.from || "/"
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;