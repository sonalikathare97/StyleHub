import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const loggedInUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!loggedInUser) {
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!existingUser) {
        alert("Account not found. Please register first.");

        navigate("/register", {
          state: {
            from: location.state?.from || "/"
          }
        });

        return;
      }

      alert("Incorrect password!");
      return;
    }

    // Save login status
    localStorage.setItem("isLoggedIn", "true");

    // Save current user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: loggedInUser.name,
        email: loggedInUser.email
      })
    );

    alert(`Welcome ${loggedInUser.name}!`);

    // Redirect to the previous requested page
    const destination = location.state?.from || "/";

    navigate(destination);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome to STYLEHUB</h2>
        <p>Login to continue shopping</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">LOGIN</button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link
            to="/register"
            state={{
              from: location.state?.from || "/"
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;