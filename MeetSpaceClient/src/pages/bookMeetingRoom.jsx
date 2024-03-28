import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const [responseData, setResponseData] = useState({ campuses: [], rooms: [] });
  const [bookingDetails, setBookingDetails] = useState({
    roomId: null,
    date: "",
    time: "",
    duration: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/bookMeetingRoom"
        );
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/bookRoom", {
        roomId: bookingDetails.roomId,
        date: bookingDetails.date,
        time: bookingDetails.time,
        duration: bookingDetails.duration,
      });
      console.log("Booking successful:", response.data);
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <h2>Meeting Rooms</h2>
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
          {responseData.rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room_name}</td>
              <td>{room.room_capacity}</td>
              <td>{room.room_charges}</td>
              <td>
                {/* Find the corresponding campus for the room */}
                {
                  responseData.campuses.find(
                    (campus) => campus.id === room.campuses_id
                  )?.name
                }
              </td>
              <td>
                {/* Display the address of the corresponding campus */}
                {
                  responseData.campuses.find(
                    (campus) => campus.id === room.campuses_id
                  )?.address
                }
              </td>
              <td>
                <button
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, roomId: room.id })
                  }
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Booking Form */}
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
              Time:
              <input
                type="time"
                name="time"
                value={bookingDetails.time}
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
};

export default BookingPage;
