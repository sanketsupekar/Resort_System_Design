import React, { useState } from "react";
import "../styles/components/LoginForm.css"; // Import your CSS file if needed
import Navbar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const {invalidUser, loginSuccessful} = require('../components/NotifyToast');
function SignIn() {
  const API_loginUser = "/api/signin";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function userValidation(data) {
    const respones = await fetch(API_loginUser, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((e) => console.log("Error : ", e));
    const json = await respones.json();
   // console.log(json);
    if (json.valid) {
     // loginSuccessful();
      navigate('/');
    //  console.log("Success");
    } else {
      invalidUser();
      console.log("Fail");
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    //  console.log(formData);
    userValidation(formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="login_container">
        <div className="title">Login</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
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
            </div>

            <div className="button">
              <button> Login</button>
            </div>
            <Link to="/signup" className="text-decoration-none">
              <a className="nav-link active" aria-current="page">
                Sign Up
              </a>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignIn;
