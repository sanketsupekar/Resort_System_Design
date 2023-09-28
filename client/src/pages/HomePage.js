import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import the Navbar component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { taskSuccessful,emailSentSuccessful,emailVerified,invalidOtp } = require('../components/NotifyToast');

function HomePage() {

  return (
    <>
      <Navbar />
      <h1>Dashboard</h1>
      <ToastContainer />
    </>
  );
}

export default HomePage;
