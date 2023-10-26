import React from "react";
import "../styles/components/customerProfileCard.css";
import { useNavigate } from "react-router-dom";
export default function CustomerProfileCard() {
  const navigate = useNavigate();
  function handleLogOutClick()
  {
    navigate("/signout");
  }
  return (
    <>
      <div className="user-profile-body">
        <div className="user-profile-container">
          <div className="user-profile-image">
            <center>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/skytsunami.png"
                alt="Skytsunami"
              />
            </center>
          </div>
          <div className="user-profile-content">
            <h3 className="user-profile-name">Sanket Supekar</h3>
            <p className="user-profile-email">sanket123@gmail.com</p>

            <button className="user-log-out-btn" onClick={handleLogOutClick}> Log Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
