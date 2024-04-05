import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddRoomMutation } from "../services/addRoomsAPI";
import { setAddingRoom, setRoomErrors } from "../slices/addRoomsSlice";
import { selectCampusInfo } from "../slices/addCampusSlice";

function AddRooms() {
  const user = useSelector((state) => state.auth.user);
  const campusInfo = useSelector(selectCampusInfo); // Access persisted campus info
  console.log(campusInfo);
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([{}]);
  const dispatch = useDispatch();
  const [addRoom, { isLoading }] = useAddRoomMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setAddingRoom(true));

      const response = await addRoom({
        campusId: campusInfo.id,
        campusName: campusInfo.premiseName,
        rooms: roomData,
      });

      if (response.error) {
        dispatch(setRoomErrors(response.error));
        return;
      }

      alert("Rooms Information added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Add room error:", error);
    } finally {
      dispatch(setAddingRoom(false));
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRoomData = [...roomData];
    updatedRoomData[index] = { ...updatedRoomData[index], [name]: value };
    setRoomData(updatedRoomData);
  };

  return (
    <div>
      <h5>Add Room Information</h5>
      <p>Welcome, {user && user.name}!</p>
      {campusInfo &&
        campusInfo.premiseName && ( // Check if campusInfo exists and has premiseName
          <>
            <p>
              You are adding rooms for <strong>{campusInfo.premiseName}</strong>
              .
            </p>
            <p>Please enter information for {campusInfo.rooms} rooms:</p>
          </>
        )}
      <form onSubmit={handleSubmit}>
        {Array.from(
          { length: campusInfo?.rooms || 0 },
          (
            _,
            index // Check if campusInfo exists and has roomNumbers
          ) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h6>Room {index + 1}</h6>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <input
                  type="text"
                  name="roomName"
                  placeholder="Room Name"
                  value={roomData[index]?.roomName || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  type="number"
                  name="roomCapacity"
                  placeholder="Room Capacity"
                  value={roomData[index]?.roomCapacity || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  type="number"
                  name="roomCharges"
                  placeholder="Room Charges"
                  value={roomData[index]?.roomCharges || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
          )
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddRooms;
