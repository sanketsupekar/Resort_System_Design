import React, { useState } from "react";
import "../styles/components/RegistrationForm.css"; // Import your CSS file if needed

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "Male", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   // console.log(e);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    console.log(formData);
  };

  return (
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
          <div className="button">
            <button> Register</button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
