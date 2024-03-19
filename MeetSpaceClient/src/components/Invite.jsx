import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { redirect, useNavigate, useLocation } from "react-router-dom";

function SendInvite() {
  const baseurl = "http://localhost:8000/api/sendInvite";
  const [receivers_email, setEmail] = useState("");
  const [receivers_name, setName] = useState("");
  const user = useLocation().state.user['user'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    // setUser(e.target.inviter.user);
    let data = qs.stringify({ receivers_email, receivers_name, user});
    
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
          <div id="email">
            <input
              name="email"
              type="email"
              placeholder="Reciever's email address"
              value={receivers_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div id="name">
            <input
              name="name"
              type="text"
              placeholder="Reciever's Name"
              value={receivers_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" id="login-btn">
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendInvite;
