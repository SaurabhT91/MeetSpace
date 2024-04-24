import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../services/authAPI";
import {
  setError,
  selectError,
  setAccessToken,
  setUser,
} from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [loginUserMutation] = useLoginUserMutation();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      dispatch(setError(null));
    };
  }, [dispatch]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email.trim() && !password.trim()) {
    dispatch(setError("Please enter both email and password."));
  } else if (!email.trim()) {
    dispatch(setError("Please enter a valid email address."));
  } else if (!password.trim()) {
    dispatch(setError("Please enter your password."));
  } else {
    try {
      const { data, error } = await loginUserMutation({ email, password });

      if (error) {
        if (error.status === 404) {
          dispatch(
            setError(
              "User not found. Check your email for a registration invite."
            )
          );
        } else if (error.status === 401) {
          dispatch(setError("Invalid password."));
        } else if (error.status === 422) {
          dispatch(
            setError("Validation error occurred. Please check your input.")
          );
        } else {
          if (error.name === "FetchError") {
            setNetworkError(true);
          }
          dispatch(
            setError("An unexpected error occurred. Please try again later.")
          );
        }
        return;
      }

    dispatch(setError(null));

      navigate("/dashboard");
    } catch (error) {
      console.error("Caught error:", error);
      dispatch(
        setError("An unexpected error occurred. Please try again later.")
      );
    }
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
          {error && <span className="error">{error}</span>}
        </div>
        <button type="submit" id="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
