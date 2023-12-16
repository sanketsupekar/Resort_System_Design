// Navbar.js

import React, { Fragment, useState } from "react";
import "../styles/components/Navbar.css"; // Import the CSS file for styling
import { primaryIcon } from "../image/index.js";
// import CustomerProfileCard from "./CustomerProfileCard";
import { useNavigate } from "react-router-dom";
const { isAdminLoggedIn } = require("../components/UserFunctions");
const {admin_profile} = require("../image/index");
function NavBar() {
  const [loggedIn, setLogin] = useState(isAdminLoggedIn());
  const [searchActive, setSearchActive] = useState(false);
  const [userProfile, setViewProfile] = useState(false);
  const navigate = useNavigate();
  function handleProfileClick() {
    navigate("/admin/profile");
  }
  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">
            <img className="img" src={primaryIcon} alt="logo" />
          </a>
          <ul className="nav-list">
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
                  <a className="item" href="/admin/monthlyBarChart">
                    Statistic
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
                  src={admin_profile}
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
