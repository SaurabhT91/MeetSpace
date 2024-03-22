import React, {useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function AddOwner() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const name = user.name;
  const [isLoggedIn, setIsLoggedIn] = useState(true);


    const handleLogout = () => {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.href = "/";
  };
  
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/getUsers/owners",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };


  return (
    <div>
      <h1>Premises Owner list</h1>
      <h3>{name}</h3>
      <div>
        <Link to={{ pathname: "/dashboard"}}>Dashboard</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AddOwner;
