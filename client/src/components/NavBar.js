// Navbar.js

import React, { Fragment, useState } from "react";
import "../styles/components/Navbar.css"; // Import the CSS file for styling
import { primaryIcon } from "../image/index.js";
import CustomerProfileCard from "./CustomerProfileCard";
import { useNavigate } from "react-router-dom";
const { isLoggedIn } = require("./UserFunctions");

function Navbar() {
  const [loggedIn, setLogin] = useState(isLoggedIn());
  const [searchActive, setSearchActive] = useState(false);
  const [userProfile, setViewProfile] = useState(false);
  const navigate = useNavigate();
  function handleProfileClick() {
    navigate("/profile");
  }
  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar-container">
          <a href="#" className="logo">
            <img className="img" src={primaryIcon} alt="logo" />
          </a>
          {loggedIn && (
            <ul className="nav-list">
              <li className="nav-item">
                <a className="item" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="item" href="/rooms">
                  Rooms
                </a>
              </li>
              <li className="nav-item">
        <a className="item" href="#">Dining</a>
      </li>
              <li className="nav-item">
                <a className="item" href="/booking">
                  Book Now
                </a>
              </li>
              <li className="nav-item">
                <a className="item" href="/reserved">
                  Reservations
                </a>
              </li>
            </ul>
          )}
          {!loggedIn && (
            <ul className="nav-list">
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
            </ul>
          )}
          {loggedIn && (
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
          )}
        </div>
      </div>

      {/* {userProfile && <CustomerProfileCard />} */}
    </Fragment>
  );
}
export default Navbar;
