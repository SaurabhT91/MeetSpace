import React, { useState, useEffect } from "react";
import axios from "axios";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import RoomData from "../components/roomData.jsx";


function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function BookingPage() {
  const isDisabled = (date) => date < new Date();
  const user = useSelector((state) => state.user);
  const [bookingDetails, setBookingDetails] = useState({
    roomId: null,
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookingRequest",
        {
          roomId: bookingDetails.roomId,
          date: bookingDetails.date,
          startTime: bookingDetails.startTime,
          endTime: bookingDetails.endTime,
          duration: bookingDetails.duration,
          user: user,
        }
      );
      const bookingConfirmed = response.data.Booking_data;
      alert(response.data.message);
      console.log("Booking successful:", response.data.Booking_data);
      navigate("/dashboard");

    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <h2>Meeting Rooms</h2>

      
        <RoomData />

      
      {bookingDetails.roomId && (
        <div>
          <h2>Book Room</h2>
          <form onSubmit={handleBookingSubmit}>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={bookingDetails.date}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Meeting starts at:
              <input
                type="time"
                name="startTime"
                value={bookingDetails.startTime}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Meeting ends at:
              <input
                type="time"
                name="endTime"
                value={bookingDetails.endTime}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Duration (in hours):
              <input
                type="number"
                name="duration"
                value={bookingDetails.duration}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
