import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { redirect, useNavigate } from "react-router-dom";
 


function Login() {
  const baseurl = "http://localhost:8000/api/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = qs.stringify({ email, password });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseurl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const user = response.data;
          // console.log(JSON.stringify(response.data));
          navigate("/dashboard", { state: {user} });
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
      </div>

      <div>
        <form method="get" onSubmit={handleSubmit}>
          <div id="login-email">
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div id="login-password">
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
