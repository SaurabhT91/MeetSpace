import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInviteUserMutation } from "../services/inviteAPI";
import { setError } from "../slices/inviteSlice";
import "../styles/dashboard.css"; // Import the CSS file for styling

function SendInvite() {
  const [receivers_email, setEmail] = useState("");
  const [receivers_name, setName] = useState("");
  const dispatch = useDispatch();
  const { error: apiError } =
    useSelector((state) => state.invitationSlice) || {}; // Handle undefined state
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const user = useSelector((state) => state.auth.user); // Replace with your logic for user info

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and name are empty
    if (!receivers_email.trim()) {
      dispatch(setError("Email is necessary."));
      return;
    }

    if (!receivers_name.trim()) {
      dispatch(setError("Name is necessary."));
      return;
    }

    try {
      await inviteUser({ receivers_email, receivers_name, id: user.id, name: user.name }); // Include sender information
      alert("Invitation sent successfully!");
      // Optionally, reset the input fields after successful submission
      setEmail("");
      setName("");
    } catch (error) {
      dispatch(setError(error.toString()));
    }
  };

  useEffect(() => {
    if (apiError) {
      alert(apiError); // Or display the error in a dedicated UI element
      dispatch(setError(null)); // Clear the error after displaying it
    }
  }, [apiError, dispatch]); // Run effect on error or dispatch change

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

        {apiError && <p className="error-message">{apiError}</p>}

        <button type="submit" className="send-invite-btn" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Invite"}
        </button>
      </form>
    </div>
  );
}

export default SendInvite;
