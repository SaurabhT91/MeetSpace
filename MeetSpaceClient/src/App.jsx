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
        <div>
          <Link to={`login`}>login</Link>
        </div>

      </div>
      <Outlet />
    </>
  );
}

export default App
