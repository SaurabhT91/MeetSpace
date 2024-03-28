import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SendInvite() {
  const baseurl = "http://localhost:8000/api/sendInvite";
  const [receivers_email, setEmail] = useState("");
  const [receivers_name, setName] = useState("");
  const user = useSelector((state) => state.user);
  const user_type = user.user_type;
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = qs.stringify({ receivers_email, receivers_name, user, user_type });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseurl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        alert("Invitation sent successfully!");
        setSuccessMessage("Invitation sent successfully!");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); 
      } else if (error.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Enter Receiver's credentials</h3>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input
              name="email"
              type="email"
              placeholder="Receiver's email address"
              value={receivers_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div id="name">
            <input
              name="name"
              type="text"
              placeholder="Receiver's Name"
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
