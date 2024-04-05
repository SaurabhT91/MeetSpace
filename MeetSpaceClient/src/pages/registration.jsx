import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../services/registrationAPI";
import {
  setRegistering,
  setError,
  selectRegistering,
  selectRegistrationError,
} from "../slices/registrationSlice"; // Import setRegistering and setError

import "../styles/registration.css";
import { useParams } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  const registering = useSelector(selectRegistering);
  const errors = useSelector(selectRegistrationError);

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

    dispatch(setRegistering(true)); // Corrected dispatch

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
      dispatch(setError("Registration failed. Please try again."));

      console.error("Registration error:", error);
    } finally {
      dispatch(setRegistering(false));
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div>
        {errors && errors.serverError && (
          <div className="error">{errors.serverError}</div>
        )}
      </div>
    </div>
  );
}

export default Registration;
