import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [networkError, setNetworkError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = qs.stringify({ email, password });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/api/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.user;
          navigate("/dashboard", { state: { user } });
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 404) {
            // User not found
            setErrors({
              error:
                "User not found. Check your email for a registration invite.",
            });
          } else if (status === 401) {
            // Incorrect password
            setErrors({ error: "Invalid password." });
          } else if (status === 422) {
            // Validation error
            setErrors(data.error);
          }
        } else {
          setNetworkError(true);
        }
      });
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div id="login-email">
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              {errors.email && <span className="error">{errors.email[0]}</span>}
            </div>
          </div>

          <div id="login-password">
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {errors.password && (
                <span className="error">{errors.password[0]}</span>
              )}
            </div>
          </div>
          <div className="error">
            {networkError && (
              <span className="error">
                Network error. Please try again later.
              </span>
            )}
            {errors.error && <span className="error">{errors.error}</span>}
          </div>
          <button type="submit" id="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
