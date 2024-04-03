import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import '../styles/dashboard.css';
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState([]);

  const id = user.id;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/bookingSchedule/${id}`
        );
        setBookingData(response.data);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Dashboard</h1>
        <h3 className="userName">{user.name}</h3>
      </div>

      <div className="nav">
        <div>
          <Link to={{ pathname: "send-invite" }}>Send Invite</Link>
          <Link to={{ pathname: "/booking", state: { user } }}>Booking</Link>
          <Link to={{ pathname: "/calendar", state: { user } }}>Calendar</Link>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <Outlet />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Campus</th>
              <th>Address</th>
              <th>Room Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.flat().map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookings.name}</td>
                <td>{booking.bookings.address}</td>
                <td>{booking.bookings.room}</td>
                <td>{booking.bookings.date}</td>
                <td>{booking.bookings.startTime}</td>
                <td>{booking.bookings.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;