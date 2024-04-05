import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import RoomData from "../components/roomData.jsx";
import BookMeetingRoom from "../components/bookRoom.jsx";

function BookingPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  const [bookingDetails, setBookingDetails] = useState({
    roomId: null,
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  

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
    </div>
  );
}

export default BookingPage;
