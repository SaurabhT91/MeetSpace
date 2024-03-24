import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useParams } from "react-router-dom";

function Registration() {
  const baseurl = "http://localhost:8000/api/register";
  const token = useParams().token;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = qs.stringify({
      name,
      email,
      contactNumber,
      address,
      password,
      password_confirmation: confirmPassword,
      token,
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
        // Handle successful registration, e.g., show a success message
        alert("Registration successful!");
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          setErrors({ serverError: "Unauthorized: Please log in to proceed." });
        } else if (status === 422) {
          setErrors(data.errors);
        } else {
          setErrors({ serverError: "Server error. Please try again later." });
        }
      } else {
        setErrors({ serverError: "Server error. Please try again later." });
      }
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div>
            {errors && errors.name && (
              <span className="error">{errors.name[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            {errors && errors.email && (
              <span className="error">{errors.email[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            id="contactNumber"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <div>
            {errors && errors.contactNumber && (
              <span className="error">{errors.contactNumber[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <div>
            {errors && errors.address && (
              <span className="error">{errors.address[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            {errors && errors.password && (
              <span className="error">{errors.password[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div>
            {errors && errors.password_confirmation && (
              <span className="error">{errors.password_confirmation[0]}</span>
            )}
          </div>
        </div>
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
