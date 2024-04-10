import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../services/authAPI";
import { setUser, setError, selectError } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [loginUserMutation] = useLoginUserMutation();

  const loginUser = async (credentials) => {
    try {
      const { data } = await loginUserMutation(credentials);
      dispatch(setUser(data.user));
      navigate("/dashboard");
    } catch (error) {
      if (error.status === 404) {
        dispatch(
          setError(
            "User not found. Check your email for a registration invite."
          )
        );
      } else if (error.status === 401) {
        dispatch(setError("Invalid password."));
      } else if (error.status === 422) {
        dispatch(setError(error.data.errors)); // Assuming error.data.errors contains validation errors
      } else {
        setNetworkError(true);
        dispatch(
          setError("An unexpected error occurred. Please try again later.")
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({ email, password });
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <h3>Enter your credentials</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="loginemail"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            autocomplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            id="loginPassword"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            autocomplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="error">
          {networkError && (
            <span className="error">
              Network error. Please try again later.
            </span>
          )}
          <span className="error">{error}</span>
        </div>
        <button type="submit" id="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
