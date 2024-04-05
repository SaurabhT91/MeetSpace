import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { useBookingRequestMutation } from "../services/bookMeetSpaceAPI";
import {
  setBookingAcknowledgement,
  setError,
} from "../slices/bookMeetSpaceSlice";
import { useNavigate } from "react-router-dom";

function BookMeetingRoom({ roomId }) {
  const user = useSelector((state) => state.auth.user); 
  const [bookingDetails, setBookingDetails] = useState({
    roomId: roomId,
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    user: user, 
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const [bookingRequest] = useBookingRequestMutation();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookingRequest(bookingDetails);
      setBookingAcknowledgement(response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error booking room:", error);
      setError(error.message);
    }
  };
  return (
    <>
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
    </>
  );
}

export default BookMeetingRoom;
