// Navbar.js

import React, { Fragment, useState } from "react";
import "../styles/components/Navbar.css"; // Import the CSS file for styling
import { primaryIcon } from "../image/index.js";
import CustomerProfileCard from "./CustomerProfileCard";
const { isLoggedIn } = require("./UserFunctions");

function Navbar() {
  const [loggedIn, setLogin] = useState(isLoggedIn());
  const [searchActive, setSearchActive] = useState(false);
  const [userProfile, setViewProfile] = useState(false);
  function handleProfileClick() {
    setViewProfile(!userProfile);
  }
  return (
    <Fragment>
      <nav className="navbar">
        <a href="#" className="logo">
          <img className="img" src={primaryIcon} alt="logo" />
        </a>
       { loggedIn && <ul className="nav-list">
          <li className="nav-item">
            <a className="item" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="item" href="/rooms">
              Room
            </a>
          </li>
          {/* <li className="nav-item">
        <a className="item" href="#">Dinig</a>
      </li> */}
          <li className="nav-item">
            <a className="item" href="/rooms/bookings">
              Booking
            </a>
          </li>
        </ul>}
       { !loggedIn && <ul className="nav-list">
          <li className="nav-item">
            <a className="item" href="/signin">
              Sign In
            </a>
          </li>
          <li className="nav-item">
            <a className="item" href="/signup">
              Sign Up
            </a>
          </li>
        </ul>}
        <div className="icon-buttons">
          <div className="icon-item">
            <img className="img-bell" src="/img/icon/bell_icon.png"></img>
          </div>
          <div className="icon-item">
            <img
              className="img-profile"
              onClick={handleProfileClick}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyNDMzOTN8&ixlib=rb-4.0.3&q=85"
            ></img>
          </div>
        </div>
      </nav>
      {userProfile && <CustomerProfileCard />}
    </Fragment>
  );
}
export default Navbar;
