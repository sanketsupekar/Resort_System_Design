// Navbar.js

import React from 'react';
import '../styles/components/Navbar.css'; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Resort</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/rooms">Rooms</a></li>
        <li><a href="/dining">Dining</a></li>
        <li><a href="/amenities">Amenities</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        {/* Add more navigation items here */}
      </ul>
    </nav>
  );
}

export default Navbar;
