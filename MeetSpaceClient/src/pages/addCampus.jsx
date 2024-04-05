import React, { useState } from "react";
import { useAddCampusMutation } from "../services/addCampusAPI";
import { setAddingCampus, setError } from "../slices/addCampusSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCampusInfo } from "../slices/addCampusSlice";
import "../styles/addCampus.css";

function AddCampus() {
  const user = useSelector((state) => state.auth.user);
  const id = user && user.id;

  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();

  const [premiseName, setPremiseName] = useState("");
  const [premiseAddress, setPremiseAddress] = useState("");
  const [rooms, setRooms] = useState("");
  const [errors, setErrors] = useState(null);

  const [addCampus, { isLoading }] = useAddCampusMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      premiseName,
      premiseAddress,
      rooms,
      id,
    };

    try {
      dispatch(setAddingCampus(true));

      const response = await addCampus(data);

      if (response.error) {
        throw response.error;
      }
      dispatch(setCampusInfo({ premiseName, premiseAddress, rooms }));

      alert("Campus added successfully!");
      navigate("/addRooms");
    } catch (error) {
      dispatch(setError("Failed to add campus. Please try again."));
      console.error("Add campus error:", error);
    } finally {
      dispatch(setAddingCampus(false));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Add Campus</h1>
      </div>
      <div className="navigation">
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="premiseName"
              type="text"
              value={premiseName}
              onChange={(e) => setPremiseName(e.target.value)}
              placeholder="Enter Campus Name"
              style={{ width: "100%" }}
              required
            />
            {errors && errors.premiseName && (
              <span className="error">{errors.premiseName[0]}</span>
            )}
          </div>

          <div className="form-group">
            <input
              id="premiseAddress"
              type="text"
              value={premiseAddress}
              onChange={(e) => setPremiseAddress(e.target.value)}
              placeholder="Enter Campus Address"
              style={{ width: "100%" }}
              required
            />
            {errors && errors.premiseAddress && (
              <span className="error">{errors.premiseAddress[0]}</span>
            )}
          </div>

          <div className="form-group">
            <input
              id="rooms"
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              placeholder="Enter Number of Rooms"
              style={{ width: "100%" }}
              required
            />
            {errors && errors.rooms && (
              <span className="error">{errors.rooms[0]}</span>
            )}
          </div>

          <div className="button-container">
            <button type="submit">Add Campus</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCampus;
