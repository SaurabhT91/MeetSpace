import { useState } from 'react'
import './App.css'
import { Outlet, Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className="appName">Welcome to MeetSpace</h1>
        <h2>Book Meeting spaces</h2>
        <Link to={`login`}>login</Link>
      </div>
      <Outlet />
    </>
  );
}

export default App
