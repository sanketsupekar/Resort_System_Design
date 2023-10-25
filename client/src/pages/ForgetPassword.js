import React, { Fragment, useEffect, useState } from "react";
// import "../styles/components/LoginForm.css"; // Import your CSS file if needed
import Navbar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import {useStateValue} from '../Context/StateProvider';
import {actionTypes} from '../Context/reducer';
import "../styles/components/forgetPassword.css";

const { displaySuccess, displayError } = require("../components/NotifyToast");
const { fetchAPI, isLoggedIn } = require("../components/UserFunctions");
const {API_loginUser} = require('../api/index');



function ForgetPassword() {
    const [{CustomerUser}, dispatchUser] = useStateValue();
    // const API_loginUser = "/api/signin";
    const [loadingVisible, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      verifyotp: "",
      password:"",
      confirmPassword: "",
    });
  
    async function userValidation(data) {
      setLoading(true);
      const respones = await fetchAPI(data, API_loginUser, "POST");
      setLoading(false);
      const json = await respones.json();
      if (respones.status == 400) {
        displayError(json.message);
        setFormData({
          email: "",
          verifyotp:"",          
          password: "",
          confirmPassword:"",
        });
      } else if (respones.status == 200) {
        displaySuccess(json.message);
        dispatchUser({
          type: actionTypes.SET_CUSTOMER,
          customerToken: json.token,
        });
        navigate("/");
      }
    }
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      userValidation(formData);
    };
  useEffect(()=>{
    if(isLoggedIn())
    navigate('/');
  },[])
    return (
      <>
        <Navbar />
        {loadingVisible ? <LoadingSpinner /> : <Fragment />}
        <div className="forget_password_container">
          <div className="title">Forget Password</div>
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
                  <div className="button">
                <button>Send OTP</button>
              </div>
                </div>
  
                {/* Password */}
                <div className="input-box">
                  <span className="details">Enter OTP</span>
                  <input
                    type="password"
                    placeholder="Enter OTP"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="button">
                <button>Verify OTP</button>
              </div>
                </div>
  
                {/* Confirm Password */}
                <div className="input-box">
                  <span className="details">New Password</span>
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />                  
                </div>

                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Enter  Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />                  
                </div>
              </div>
  
              <div className="button">
                <button>Confirm</button>
              </div>
          
  
            </form>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }

export default ForgetPassword



