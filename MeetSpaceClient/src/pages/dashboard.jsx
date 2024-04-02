import React, { useState, useEffect } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [responseData, setResponseData] = useState("");
  const id = user.id;
  console.log(user.id);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/bookingSchedule/${id}`,
        );
        setResponseData(response.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{user && user.name}</h3>
      {user.user_type === "admin" && (
        <div>
          <div>
            <Link to={{ pathname: "send-invite" }}>Send Invite</Link>
            <div id="invite">
              <Outlet />
            </div>
          </div>
          <div>
            <Link to={{ pathname: "/booking", state: { user } }}>Booking</Link>
          </div>
          <div>
            <Link to={{ pathname: "/calendar", state: { user } }}>
              Calendar
            </Link>
          </div>
        </div>
      )}
      {user.user_type === "owner" && (
        <div>
          <div>
            <Link to={{ pathname: "send-invite", state: user.user }}>
              Send Invite
            </Link>
            <div id="invite">
              <Outlet />
            </div>
          </div>

          <div>
            <Link to={{ pathname: "/booking", state: { user } }}>Booking</Link>
          </div>
          <div>
            <Link to={{ pathname: "/addCampus", state: { user } }}>
              Add Campus
            </Link>
          </div>
        </div>
      )}
      {user.user_type === "consumer" && (
        <div>
          <Link to={{ pathname: "/booking", state: { user } }}>Booking</Link>
        </div>
      )}

      <div>
        <table>
          <thead>
            <tr>
              <th>Campus</th>
              <th>Address</th>
              <th>Room Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
