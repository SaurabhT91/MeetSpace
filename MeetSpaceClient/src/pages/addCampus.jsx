import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function AddCampus() {
  const user = useSelector((state) => state.user);
  const id = user && user.id;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [premiseName, setPremiseName] = useState("");
  const [premiseAddress, setPremiseAddress] = useState("");
  const [rooms, setRooms] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      premiseName: premiseName,
      premiseAddress: premiseAddress,
      rooms: rooms,
      id: id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/addCampus",
        qs.stringify(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        alert("Campus added successfully!");
        dispatch({ type: "SET_CAMPUS_INFO", payload: data});
        navigate("/addRooms"); 
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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Add Campus</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="premiseName">Name of Campus:</label>
          <input
            id="premiseName"
            type="text"
            value={premiseName}
            onChange={(e) => setPremiseName(e.target.value)}
            required
          />
          {errors && errors.premiseName && (
            <span className="error">{errors.premiseName[0]}</span>
          )}
        </div>

        <div>
          <label htmlFor="premiseAddress">Address:</label>
          <input
            id="premiseAddress"
            type="text"
            value={premiseAddress}
            onChange={(e) => setPremiseAddress(e.target.value)}
            required
          />
          {errors && errors.premiseAddress && (
            <span className="error">{errors.premiseAddress[0]}</span>
          )}
        </div>

        <div>
          <label htmlFor="rooms">Rooms:</label>
          <input
            id="rooms"
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
          />
          {errors && errors.rooms && (
            <span className="error">{errors.rooms[0]}</span>
          )}
        </div>

        <div>
          <button type="submit">Add Campus</button>
        </div>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AddCampus;
