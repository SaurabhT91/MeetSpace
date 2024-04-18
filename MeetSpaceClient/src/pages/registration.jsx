import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../services/registrationAPI";
import {
  setRegistering,
  setError,
  selectRegistering,
  selectRegistrationError,
} from "../slices/registrationSlice";
import "../styles/registration.css"; // Import the CSS file
import { useParams } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  const registering = useSelector(selectRegistering);
  const error = useSelector(selectRegistrationError);

  const { token } = useParams();
  const [tokenWithoutType, type] = token.split("&type=");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setRegistering(true));

    const userData = {
      name,
      email,
      contactNumber,
      address,
      password,
      password_confirmation: confirmPassword,
      token: tokenWithoutType,
      type,
    };

    try {
      const response = await registerUser(userData);

      if (response.error) {
        throw response.error;
      }

      alert("Registration successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Registration error:", error);
      if (error && error.data && error.data.errors) {
        dispatch(setError(error.data.errors));
      } else {
        dispatch(setError("Registration failed. Please try again."));
      }
    } finally {
      dispatch(setRegistering(false));
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error && error.name && (
            <div className="error">{error.name.join(", ")}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && error.email && (
            <div className="error">{error.email.join(", ")}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="tel"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          {error && error.contactNumber && (
            <div className="error">{error.contactNumber.join(", ")}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {error && error.address && (
            <div className="error">{error.address.join(", ")}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && error.password && (
            <div className="error">{error.password.join(", ")}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && error.password_confirmation && (
            <div className="error">
              {error.password_confirmation.join(", ")}
            </div>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
