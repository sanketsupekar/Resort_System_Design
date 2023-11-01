import React, { useState, useEffect, Fragment } from "react";
import "../styles/components/enquire.css"; // Import your CSS file if needed
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
const { API_contactus } = require("../api/index");
const { displayError, displaySuccess } = require("../components/NotifyToast");
const { fetchAPI } = require("../components/UserFunctions");

function Enquire(props) {
  const emptyData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    // Default value
  };
  const [loadingVisible, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyData);

  async function uploadMessage(formData) {
    setLoading(true);
    const respones = await fetchAPI(formData, API_contactus, "POST");
    setLoading(false);
    const json = await respones.json();
    if (respones.status == 200) {
      displaySuccess(json.message);
      setFormData(emptyData)
    } else {
      displayError(json.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // displaySuccess("Sanket");
    uploadMessage(formData);
    // props.getUserData(formData);
  };

  return (
    <>
      <Navbar />
      {loadingVisible ? <LoadingSpinner /> : <Fragment />}
      <div className="registration_container">
        <div className="title">Fill Form</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              {/* Full Name */}
              <div className="input-box">
                <span className="details">First Name</span>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* lastName */}
              <div className="input-box">
                <span className="details">Last Name</span>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Message */}
              <div className="input-box text-area">
                <span className="details">Message</span>
                <textarea
                  // type="text-box"
                  placeholder="Enter Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="10"
                  cols="95"
                />
              </div>
            </div>
            <div className="button">
              <button> Submit</button>
            </div>
          </form>
        </div>

        {/* Same as */}
        <ToastContainer />
      </div>
    </>
  );
}

export default Enquire;
