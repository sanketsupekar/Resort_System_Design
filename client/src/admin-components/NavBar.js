// Navbar.js

import React, { Fragment, useState } from "react";
import "../styles/components/Navbar.css"; // Import the CSS file for styling
import { primaryIcon } from "../image/index.js";
// import CustomerProfileCard from "./CustomerProfileCard";
import { useNavigate } from "react-router-dom";
const { isAdminLoggedIn } = require("../components/UserFunctions");

function NavBar() {
  const [loggedIn, setLogin] = useState(isAdminLoggedIn());
  const [searchActive, setSearchActive] = useState(false);
  const [userProfile, setViewProfile] = useState(false);
  const navigate = useNavigate();
  function handleProfileClick() {
    // navigate("/profile");
  }
  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">
            <img className="img" src={primaryIcon} alt="logo" />
          </a>
          <ul className="nav-list">
<<<<<<< HEAD
            <li className="nav-item">
              <a className="item" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="item" href="/rooms">
                Bookings
              </a>
            </li>
            <li className="nav-item">
              <a className="item" href="/admin/monthlyBarChart">
                Statistics
              </a>
            </li>

            <li className="nav-item">
              <a className="item" href="/enquire">
                Enquire
              </a>
            </li>
=======
>>>>>>> 116ccd9d20fe02cc7d59278902a0a5d04cb951fa
            {loggedIn ? (
              <Fragment>
                <li className="nav-item">
                  <a className="item" href="/admin">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="item" href="/admin/bookings">
                    Bookings
                  </a>
                </li>

                <li className="nav-item">
                  <a className="item" href="/admin/enquire">
                    Enquire
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <a className="item" href="/admin/signin">
                    Sign In
                  </a>
                </li>
              </Fragment>
            )}
          </ul>

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
export default NavBar;
