import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../services/authAPI";
import { setError, selectError } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { setUser, setAccessToken } from "../slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [loginUserMutation] = useLoginUserMutation();
  const user = useSelector((state) => state.auth.user);
  


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data, error } = await loginUserMutation({ email, password });

    if (error) {
      console.error("API error:", error);
      if (error.status === 404) {
        dispatch(
          setError(
            "User not found. Check your email for a registration invite."
          )
        );
      } else if (error.status === 401) {
        dispatch(setError("Invalid password."));
      } else if (error.status === 422) {
        dispatch(setError(error.data.errors));
      } else {
        console.error("Unexpected error:", error);
        if (error.name === "FetchError") {
          setNetworkError(true);
        }
        dispatch(
          setError("An unexpected error occurred. Please try again later.")
        );
      }
      return;
    }
    console.log("Login successful. Data:", data);
    if (user) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Caught error:", error);
    dispatch(setError("An unexpected error occurred. Please try again later."));
  }
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
            autoComplete="username"
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
            autoComplete="current-password"
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
