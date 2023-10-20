import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import the Navbar component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate,useNavigate } from "react-router-dom";
import Payment from "./Payment";
const { fetchAPI, isLoggedIn } = require("../components/UserFunctions");
function HomePage() {
  const navigate = useNavigate();
  useEffect(()=>{
    //console.log(isLoggedIn);
    if(!isLoggedIn())  navigate('/signin');
  },[])
  return (
    <>
      <Navbar />
      <h1>Dashboard</h1>
      {/* <Payment></Payment> */}
      <ToastContainer />
    </>
  );
}

export default HomePage;
