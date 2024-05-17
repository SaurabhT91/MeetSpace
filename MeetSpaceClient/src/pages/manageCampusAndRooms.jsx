import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCampusAndRoomDataQuery } from "../services/showOwnerCampusAndRoomsAPI";
import {
  useUpdateAvailabilityMutation,
  useUpdateTimingMutation,
} from "../services/availabilityAndTimeMangerAPI";
import { Link } from "react-router-dom";

function ManageCampusAndRooms() {
  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state.auth.user["id"]);
  const { data, isLoading, error } = useFetchCampusAndRoomDataQuery(ownerId);
  const [availabilityAndTimeManager, { isLoading: isSubmitting }] =
    useAvailabilityAndTimeManagerMutation();

  // State to manage edited campus timings
  const [editedCampusTimings, setEditedCampusTimings] = useState({});
  // State to manage campus availability
  const [campusAvailability, setCampusAvailability] = useState({});

  // Function to handle changes in campus timing
  const handleCampusTimingChange = (campusId, field, value) => {
    setEditedCampusTimings((prevTimings) => ({
      ...prevTimings,
      [campusId]: {
        ...prevTimings[campusId],
        [field]: value,
      },
    }));
  };

  // Function to handle changes in campus availability
  const handleCampusAvailabilityChange = (campusId) => {
    setCampusAvailability((prevAvailability) => ({
      ...prevAvailability,
      [campusId]: !prevAvailability[campusId], // Toggle availability
    }));
  };

  const handleSubmit = async () => {
    try {
      // Submit logic here
    } catch (error) {
      console.error("Error submitting changes:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Manage Campus And Rooms</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      {data.CampusesWithRooms.map((campusWithRooms) => (
        <div key={campusWithRooms.campus.id}>
          <h2>{campusWithRooms.campus.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Opening Time</th>
                <th>Closing Time</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {/* Render editable campus timings */}
              <tr>
                <td>
                  <strong>Campus Timings</strong>
                </td>
                <td>
                  <input
                    type="time"
                    value={
                      editedCampusTimings[campusWithRooms.campus.id]
                        ?.open_time || campusWithRooms.campus.open_time
                    }
                    onChange={(e) =>
                      handleCampusTimingChange(
                        campusWithRooms.campus.id,
                        "open_time",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={
                      editedCampusTimings[campusWithRooms.campus.id]
                        ?.close_time || campusWithRooms.campus.close_time
                    }
                    onChange={(e) =>
                      handleCampusTimingChange(
                        campusWithRooms.campus.id,
                        "close_time",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={
                      campusAvailability[campusWithRooms.campus.id] || false
                    }
                    onChange={() =>
                      handleCampusAvailabilityChange(campusWithRooms.campus.id)
                    }
                  />
                </td>
              </tr>
              {/* Render room timings */}
              {campusWithRooms.rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.room_name}</td>
                  <td>
                    <input
                      type="time"
                      value={room.open_time}
                      onChange={(e) =>
                        handleTimeChange(room.id, "openingTime", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={room.close_time}
                      onChange={(e) =>
                        handleTimeChange(room.id, "closingTime", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Changes"}
      </button>
    </div>
  );
}

export default ManageCampusAndRooms;
