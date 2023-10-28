import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import the Navbar component
import RegistrationForm from "../components/RegistrationForm";
import GenerateOTP from "../components/GenerateOTP";
import VerifyOTP from "../components/VerifyOTP";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const { displayError, displaySuccess } = require("../components/NotifyToast");
const { fetchAPI } = require("../components/UserFunctions");
const {API_customerExist,API_verificationOTP, API_generateOTP} = require('../api/index');
function SignUp() {
  // const API_generateOTP = "/api/generateOTP";
  // const API_verificationOTP = "/api/verificationOTP";
  // const API_customerExist = "/api/userAlreadyExist";
  const naviagte = useNavigate();
  const [registrationVisible, setRegistrationVisible] = useState(true);
  const [generateOTPVisible, setGenerateOTPVisible] = useState(false);
  const [verifyOTPVisible, setVerifyOTPVisible] = useState(false);
  const [loadingVisible, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "Male", // Default value
  });

  async function customerExit(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_customerExist, "POST");
    setLoading(false);
    const json = await respones.json();
    if (json.exist) {
      displayError(json.message);
    } else {
      setRegistrationVisible(false);
      setGenerateOTPVisible(true);
    }
  }

  async function verifyOTP(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_verificationOTP, "POST");
    setLoading(false);
    const json = await respones.json();
    if (respones.status == 200) {
      displaySuccess(json.message);
      naviagte("/signin");
    } else {
      displayError(json.message);
    }
  }

  async function uploadUserData(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_generateOTP, "POST");
    setLoading(false);
    const json = await respones.json();
    if (respones.status == 200) {
      displaySuccess(json.message);
      setGenerateOTPVisible(false);
      setVerifyOTPVisible(true);
    } else {
      displayError(json.message);
    }
  }

  function getUserData(data) {
    setRegistrationData({ ...registrationData, ...data });
    customerExit({ email: data.email });
  }

  function onClickGenerateOTP(e) {
    uploadUserData(registrationData);
  }

  function onClickSubmitOTP(data) {
    const verifyData = {
      userEmail: registrationData.email,
      userOtp: data.otp,
      userData: registrationData,
    };
    verifyOTP(verifyData);
  }

  function otpSubmitTimeExpair() {
    setVerifyOTPVisible(false);
    setGenerateOTPVisible(true);
  }

  return (
    <>
      <Navbar />
      {loadingVisible ? <LoadingSpinner /> : <Fragment />}
      {registrationVisible ? (
        <RegistrationForm getUserData={getUserData} />
      ) : (
        <Fragment />
      )}
      {generateOTPVisible ? (
        <GenerateOTP
          userEmail={registrationData.email}
          onClickGenerateOTP={onClickGenerateOTP}
        />
      ) : (
        <Fragment />
      )}
      {verifyOTPVisible ? (
        <VerifyOTP
          onClickSubmitOTP={onClickSubmitOTP}
          otpSubmitTimeExpair={otpSubmitTimeExpair}
        />
      ) : (
        <Fragment />
      )}
      <Footer></Footer>
      <ToastContainer />
    </>
  );
}

export default SignUp;
