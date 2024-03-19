import React, { useState } from "react"
import { useLocation, Link, Outlet } from 'react-router-dom';

function Dashboard() {

    const params = useLocation().state;
    console.log(params);
    const object = params.user;
    // console.log(object);
    const user = object.user;
    const name = user.name;   
    // console.log(user.name);

    return (
      <div>
        <h1>Dashboard</h1>
        <h3>{name}</h3>
        <Link to="send-invite" state={params}>Send Invite</Link>
        <div id="invite">
          <Outlet />
        </div>
      </div>
    );
}

export default Dashboard;

