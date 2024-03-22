import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function BookingSpace() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

      const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/";
      };

  return (
    <div>
      <h1>Book Meeting Space</h1>
      <h3>{name}</h3>
      <div>
        <Link to={{ pathname: "/dashboard"}}>Dashboard</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default BookingSpace;
