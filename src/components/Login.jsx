import "./Login.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      toast.success("Login successful!");
      login();
      navigate("/");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5 login-all">
      <h2 className="login-login">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group my-3 username-all ">
          <label>Username</label>
          <input
            type="text"
            className="form-control w-50 m-auto my-3"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group my-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control w-50 m-auto my-3"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
