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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [premiseName, setPremiseName] = useState("");
  const [premiseAddress, setPremiseAddress] = useState("");
  const [rooms, setRooms] = useState("");
  const [error, setError] = useState(null); // Change 'errors' to 'error'

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
          const response = await addCampus(data);

          // Check if the response contains any errors
          if (response.error) {
            throw response.error;
          }

          dispatch(setCampusInfo({ premiseName, premiseAddress, rooms, id }));

          alert("Campus added successfully!");
          navigate("/addRooms");
        } catch (error) {
          // Handle API request errors
          console.error("Error adding campus:", error);

          if (error && error.data && error.data.errors) {
            const { errors } = error.data;

            // Check if there are room-related errors
            if (errors.rooms) {
              // Display the first room error
              dispatch(setError(errors.rooms[0]));
            } else {
              // Display the general error message
              dispatch(setError(errors.error));
            }
          } else {
            // Display a generic error message if the error structure is unexpected
            dispatch(
              setError(
                "An error occurred while adding campus. Please try again later."
              )
            );
          }
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
          </div>
          <span style={{ color: "lightcoral", fontSize: "0.8rem" }}>
            Note: Currently, we don't host campuses with more than 15 rooms.
          </span>

          <div className="button-container">
            <button type="submit">Add Campus</button>
          </div>
        </form>
        {/* Display error message if exists */}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default AddCampus;
