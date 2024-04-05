import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/dashboard.css"; // Import the CSS file for styling

function SendInvite() {
  const baseurl = "http://localhost:8000/api/sendInvite";
  const [receivers_email, setEmail] = useState("");
  const [receivers_name, setName] = useState("");
  const [error, setError] = useState("");
  
  const user = useSelector((state) => state.auth.user);
  
  const user_type = user.user_type;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and name are empty
    if (!receivers_email.trim()) {
      setError("Email is necessary.");
      return;
    }

    if (!receivers_name.trim()) {
      setError("Name is necessary.");
      return;
    }

    let data = qs.stringify({
      receivers_email,
      receivers_name,
      user,
      user_type,
    });

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
        // Optionally, reset the input fields after successful submission
        setEmail("");
        setName("");
        setError(""); // Clear any previous error messages
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
    <div className="send-invite-container">
      <h2>Send Invitation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="receieverEmail"
            name="email"
            type="email"
            placeholder="Enter email address"
            value={receivers_email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            id="receieverName"
            name="name"
            type="text"
            placeholder="Enter name"
            value={receivers_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="send-invite-btn">
          Send Invite
        </button>
      </form>
    </div>
  );
}

export default SendInvite;
