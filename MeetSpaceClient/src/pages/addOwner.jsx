import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DataTable from "react-data-table-component";

function AddOwner() {
  const user = useSelector((state) => state.user);
  const name = user.name;
  const [usersData, setUsersData] = useState(null); // Initialize state as null
  const [isLoggedIn, setIsLoggedIn] = useState(true);
   const columns = [
     {
       name: "ID",
       selector: (row) => row.id,
       sortable: true,
     },
     {
       name: "Name",
       selector: (row) => row.name,
       sortable: true,
     },
     {
       name: "Email",
       selector: (row) => row.email,
       sortable: true,
     },
     {
       name: "Contact Number",
       selector: (row) => row.contact_number,
       sortable: true,
     },
     {
       name: "User Role",
       selector: (row) => row.user_type,
       sortable: true,
     },
   ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/getUsers/owners",
          user
        );
        if (response.status === 200) {
          setUsersData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data only if usersData is null (i.e., not fetched yet)
    if (usersData === null) {
      fetchData();
    }
  }, [user, usersData]); // Trigger useEffect when user or usersData change

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Premises Owner list</h1>
      <h3>{name}</h3>
      {usersData !== null ? ( // Render DataTable if data is fetched
        <div>
          <DataTable columns={columns} data={usersData} />
          <div>
            <Link to={{ pathname: "/dashboard" }}>Dashboard</Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        // Render loading message or spinner while data is being fetched
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AddOwner;
