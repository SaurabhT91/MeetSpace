import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      {/* Link to the Home page */}
      <Link to="/">Home</Link>
      {/* Link to the About page */}
      <Link to="/login">Login</Link>
      {/* Link to the About page */}
      <Link to="/about">About</Link>
      {/* Link to the Contact page */}
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Navigation;
