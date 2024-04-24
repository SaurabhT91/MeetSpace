import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/dashboard.css";
import { setBookingData } from "../slices/bookingInformationSlice";
import { useFetchBookingDataQuery } from "../services/bookingInfoAPI";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    data: bookingData,
    error,
    isLoading,
  } = useFetchBookingDataQuery(user.id);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    if (bookingData) {
      dispatch(setBookingData(bookingData));
    }
  }, [bookingData, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const isAdmin = user.user_type === "admin";
  const isOwner = user.user_type === "owner";

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
          {isOwner && (
            <Link to={{ pathname: "/addcampus", state: { user } }}>
              Add Campus
            </Link>
          )}
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
            {bookingData && // Check if bookingData is not null or undefined
              bookingData.flat().map((booking, index) => (
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
