import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddRooms() {
  const campusInfo = useSelector((state) => state.campusInfo);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [roomData, setRoomData] = useState(
    Array.from({ length: campusInfo.rooms || 5 }, () => ({
      roomName: "",
      roomCapacity: "",
      roomCharges: "",
    }))
  );
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const rooms = [...roomData];
    rooms[index][name] = value;
    setRoomData(rooms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = validateFields();
    if (!noErrors) return;

    try {
    const requestData = {
      campusName: campusInfo.premiseName, // Include campus name from campusInfo
      rooms: roomData, // Include room data
    };


      const response = await axios.post(
        "http://localhost:8000/api/addRoom",
        qs.stringify(requestData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        alert("Rooms Information added successfully")
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          setErrors({ serverError: "Unauthorized: Please log in to proceed." });
        } else if (status === 422) {
          setErrors({
            serverError: "Validation error: Please check your input fields.",
          });
        } else {
          setErrors({ serverError: "Server error. Please try again later." });
        }
      } else {
        setErrors({ serverError: "Server error. Please try again later." });
      }
    }
  };

  const validateFields = () => {
    let noErrors = true;
    const errors = {};

    roomData.forEach((room, index) => {
      if (!room.roomName || !room.roomCapacity || !room.roomCharges) {
        errors[index] = "All fields are required";
        noErrors = false;
      }
    });

    setErrors(errors);
    return noErrors;
  };


  return (
    <div>
      <h5>Add Room Information</h5>
      <p>Campus Name: {campusInfo.premiseName}</p>
      <p>
        {user.name} you have to fill information of {campusInfo.rooms} meeting rooms of your campus { campusInfo.premiseName}
      </p>
      <form onSubmit={handleSubmit}>
        {roomData.map((room, index) => (
          <div key={index}>
            <input
              type="text"
              name="roomName"
              placeholder="Room Name"
              value={room.roomName}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="number"
              name="roomCapacity"
              placeholder="Room Capacity"
              value={room.roomCapacity}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="number"
              name="roomCharges"
              placeholder="Room Charges"
              value={room.roomCharges}
              onChange={(e) => handleInputChange(index, e)}
            />
            {errors[index] && (
              <span style={{ color: "red" }}>{errors[index]}</span>
            )}
          </div>
        ))}
        {errors.serverError && (
          <span style={{ color: "red" }}>{errors.serverError}</span>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRooms;
