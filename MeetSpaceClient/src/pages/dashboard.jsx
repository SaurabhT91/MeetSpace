import React, { useState, useEffect } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const [isLoggedIn, setIsLoggedIn] = useState(true);


  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

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
            <Link to={{ pathname: "/calendar", state: { user } }}>Calendar</Link>
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
