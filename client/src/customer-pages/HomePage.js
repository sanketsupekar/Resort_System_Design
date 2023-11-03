import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import the Navbar component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import Payment from "./Payment";
import Header from "../components/Header";
import CustomerProfileCard from "../components/CustomerProfileCard";
import Footer from "../components/Footer";
import HomeWelcome from "../components/HomeWelcome"
import HomeRoomSuites from "../components/HomeRoomSuites"
import HomePhotos from "../components/HomePhotos";
const { fetchAPI, isLoggedIn } = require("../components/UserFunctions");
function HomePage() {
  const data = {
    title: "Coconut County Resort",
    sub_title:
      "A Paradise Unparalleled: Where Tranquility Meets Luxury! Nestled amidst nature's embrace, our resort is a sanctuary for the soul, a haven for the senses, and an escape from the ordinary. Experience the epitome of opulence and relaxation as you embark on a journey to discover the true meaning of bliss. Your unforgettable escape awaits at our resort – where every moment is designed to enchant, inspire, and rejuvenate.",
      image : "resort_header.jpg"
  };
  const navigate = useNavigate();
  // useEffect(() => {
  //   //console.log(isLoggedIn);
  //   if (!isLoggedIn()) navigate("/signin");
  // }, []);
  return (
    <>
      <Navbar />
      <Header data = {data} />
     <HomeWelcome></HomeWelcome>
     <HomeRoomSuites></HomeRoomSuites>
     <HomePhotos></HomePhotos>
      {/* <h1>Dashboard</h1> */}
      {/* <Payment></Payment> */}

      <ToastContainer />
      <Footer></Footer>

    </>
  );
}

export default HomePage;
