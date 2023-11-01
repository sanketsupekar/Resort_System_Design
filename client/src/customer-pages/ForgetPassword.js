import React, { Fragment, useEffect, useState } from "react";
// import "../styles/components/LoginForm.css"; // Import your CSS file if needed
import Navbar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useStateValue } from "../Context/StateProvider";
import { actionTypes } from "../Context/reducer";
import "../styles/components/forgetPassword.css";
import Footer from "../components/Footer";

const { displaySuccess, displayError } = require("../components/NotifyToast");
const { fetchAPI, isLoggedIn } = require("../components/UserFunctions");
const { API_loginUser, API_generateOTP,API_userAndOtpVerification,API_updatePassword } = require("../api/index");

function ForgetPassword() {
  const [{ CustomerUser }, dispatchUser] = useStateValue();
  // const API_loginUser = "/api/signin";
  const [loadingVisible, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    verifyotp: "",
    password: "",
    confirmPassword: "",
  });

  async function generateOtp(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_generateOTP, "POST");
    setLoading(false);
    const json = await respones.json();
    if (respones.status == 200) {
      displaySuccess(json.message);
      console.log(json);
      setEmailSent(true);
      // setGenerateOTPVisible(false);
    } else {
      displayError(json.message);
    }
  }

  async function verifyOtp(data) {
    setLoading(true);
    const respones = await fetchAPI(data,API_userAndOtpVerification , "POST");
    setLoading(false);
    const json = await respones.json();
    if (respones.status == 200) {
      displaySuccess(json.message);
      console.log(json);
      setOtpVerified(true);
      // setGenerateOTPVisible(false);
    } else {
      displayError(json.message);
    }
  }
 async function updatePassword(data)
 {
    setLoading(true);
    const respones = await fetchAPI(data,API_updatePassword,"POST");
    const json = await respones.json();
    setLoading(false);
    if(respones.status == 200)
    {
      displaySuccess(json.message);
      navigate("/signin")
    }
    else
    {
      displaySuccess(json.message);
    }
 }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword({
      password : formData.password,
      confirmPassword : formData.confirmPassword
    });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    console.log(formData);
    generateOtp({ email: formData.email });
  };

  const handleVerifyOtp = (e) =>{
    e.preventDefault();
    console.log(formData);
    verifyOtp({
      userEmail : formData.email,
      userOtp : formData.verifyotp
    })

  }

  useEffect(() => {
    if (isLoggedIn()) navigate("/");
  }, []);
  return (
    <>
      <Navbar />
      {loadingVisible ? <LoadingSpinner /> : <Fragment />}
      <div className="forget_password_container">
        <div className="title">Forget Password</div>
        <div className="content">
          <form>
            <div className="user-details" >
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
                  disabled = {emailSent}
                />
                <div className="button">
                  <button onClick={handleSendOtp}  disabled = {emailSent}>Send OTP</button>
                </div>
              </div>

              {/* OTP */}
              {emailSent && (
                <div className="input-box">
                  <span className="details">Enter OTP</span>
                  <input
                    // type="password"
                    placeholder="Enter OTP"
                    name="verifyotp"
                    value={formData.verifyotp}
                    onChange={handleChange}
                    required
                    disabled = {otpVerified}
                  />
                  <div className="button">
                    <button disabled = {otpVerified} onClick={handleVerifyOtp}>Verify OTP</button>
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              { emailSent && otpVerified &&
                <Fragment>
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
                      placeholder="Enter Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Fragment>
              }
            </div>

           { emailSent && otpVerified && <div className="button">
              <button onClick={handleSubmit}>Confirm</button>
            </div>}
          </form>
        </div>
      </div>
      <ToastContainer />
      <div className="footer-at-end">
       {/* <Footer></Footer> */}
      </div>
     
    </>
  );
}

export default ForgetPassword;
