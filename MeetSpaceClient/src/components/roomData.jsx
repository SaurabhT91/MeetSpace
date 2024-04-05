import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setcampusAndRoomData } from "../slices/campus&roomSlice";
import { useFetchCampusAndRoomDataQuery } from "../services/campus&roomInfoAPI";
import BookMeetingRoom from "./bookRoom";

function RoomData() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const {
    data: campusAndRoomData,
    error,
    isLoading,
  } = useFetchCampusAndRoomDataQuery();
  console.log(campusAndRoomData);

  useEffect(() => {
    if (campusAndRoomData) {
      dispatch(setcampusAndRoomData(campusAndRoomData));
    }
  }, [campusAndRoomData, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleBookClick = (roomId) => {
    setSelectedRoomId(roomId);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Charges</th>
            <th>Campus</th>
            <th>Campus Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {campusAndRoomData.rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room_name}</td>
              <td>{room.room_capacity}</td>
              <td>{room.room_charges}</td>
              <td>
                {
                  campusAndRoomData.campuses.find(
                    (campus) => campus.id === room.campuses_id
                  )?.name
                }
              </td>
              <td>
                {
                  campusAndRoomData.campuses.find(
                    (campus) => campus.id === room.campuses_id
                  )?.address
                }
              </td>
              <td>
                <button onClick={() => handleBookClick(room.id)}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRoomId && (
        <div>
          <h2>Book Room</h2>
          <BookMeetingRoom roomId={selectedRoomId} user={user} />
        </div>
      )}
    </div>
  );
}

export default RoomData;
