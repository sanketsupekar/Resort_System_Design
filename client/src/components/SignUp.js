import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import the Navbar component
import RegistrationForm from "../components/RegistrationForm";
import GenerateOTP from "../components/GenerateOTP";
import VerifyOTP from "../components/VerifyOTP";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const {
  taskSuccessful,
  emailSentSuccessful,
  emailVerified,
  invalidOtp,
} = require("../components/NotifyToast");

function SignUp() {
  const API_generateOTP = "/api/generateOTP";
  const API_verificationOTP = "/api/verificationOTP";
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

  async function verifyOTP(data) {
    try {
      setLoading(true);
      const respones = await fetch(API_verificationOTP, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((e) => console.log("Error : ", e));
      const json = await respones.json();
      setLoading(false);
      if (respones.status == 200) {
        emailVerified();
        naviagte("/signin");
      } else {
        invalidOtp();
      }
      console.log(json);
    } catch (e) {
      console.log("Error : ", e);
    }
  }
  async function uploadUserData(data) {
    try {
      setLoading(true);
      const respones = await fetch(API_generateOTP, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((e) => console.log("Error : ", e));
      const json = await respones.json();
      console.log(json);
      setLoading(false);
      emailSentSuccessful();
      setVerifyOTPVisible(true);
    } catch (e) {
      console.log("Error : ", e);
    }
  }

  function getUserData(data) {
    setRegistrationData({ ...registrationData, ...data });
    setRegistrationVisible(false);
    setGenerateOTPVisible(true);
  }

  function onClickGenerateOTP(e) {
    uploadUserData(registrationData);
    setGenerateOTPVisible(false);
  }

  function onClickSubmitOTP(data) {
    const verifyData = {
      userEmail: registrationData.email,
      userOtp: data.otp,
      userData : registrationData
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
      <ToastContainer />
    </>
  );
}

export default SignUp;
