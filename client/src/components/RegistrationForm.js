import React, { useState,useEffect } from "react";
import "../styles/components/RegistrationForm.css"; // Import your CSS file if needed
import GenerateOTP from "../components/GenerateOTP";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";

function RegistrationForm(props) {
  const [formData, setFormData] = useState({
    firstName: "Sanket",
    lastName: "Supekar",
    email: "sanketsupekar123@gmail.com",
    phoneNumber: "9130420859",
    password: "sanket",
    confirmPassword: "sanket",
    gender: "Male", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getUserData(formData);
  };
  


  return (
    <>
    <div className="registration_container">
      <div className="title">Registration</div>
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

            {/* Gender*/}
            <div className="input-box">
              <span className="details">Gender</span>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={{ width: '100%', height: '40px' }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Gender*/}
            <div className="input-box" style={{ visibility: "hidden" }}>
              <span className="details">Gender</span>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required

              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Password */}
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div  className="button">
            <button> Register</button>
            
          </div>
          <Link to="/signin" className="text-decoration-none">
              <a className="nav-link active" aria-current="page">
                Sign In
              </a>
            </Link>
        </form>
      </div>
    </div>
    </>

  );
}

export default RegistrationForm;
