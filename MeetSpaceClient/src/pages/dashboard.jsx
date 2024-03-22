import React, { useState, useEffect } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isUser, setUser] = useState(false);
  const [isOwner, setOwner] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (user && user.user_type === "03") {
      setUser(true);
    } else if (user && user.user_type === "02") {
      setOwner(true);
    } else if (user && user.user_type === "01") {
      setAdmin(true);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{user && user.name}</h3>
      {isAdmin && (
        <div>
          <div>
            <Link to={{ pathname: "send-invite"}}>
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
            <Link to={{ pathname: "/addOwner", state: { user } }}>
              Add Owner
            </Link>
          </div>
        </div>
      )}
      {isOwner && (
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
      {isUser && (
        <div>
          <Link to={{ pathname: "/booking", state: { user } }}>Booking</Link>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
