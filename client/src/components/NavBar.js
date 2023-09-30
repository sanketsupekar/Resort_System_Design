// Navbar.js

import React, { Fragment, useState } from "react";
import "../styles/components/Navbar.css"; // Import the CSS file for styling
const { isLoggedIn } = require("./UserFunctions");
function Navbar() {
  const [loggedIn, setLogin] = useState(isLoggedIn());
  return (
    <nav className="navbar">
      <div className="logo">Resort</div>
      <ul className="nav-links">
        {!loggedIn ? (
          <>
            <li>
              <a href="/signin">Sign In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/rooms">Rooms</a>
            </li>
            <li>
              <a href="/dining">Dining</a>
            </li>
            <li>
              <a href="/amenities">Amenities</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/signout">Sign Out</a>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;
