import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import the Navbar component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import Payment from "./Payment";
import Header from "../components/Header";
import CustomerProfileCard from "../components/CustomerProfileCard";
import Footer from "../components/Footer";
const { fetchAPI, isLoggedIn } = require("../components/UserFunctions");
function HomePage() {
  const data = {
    title: "Coconut County Resort",
    sub_title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod autem commodi iste eum omnis saepe temporibus? Veniam ipsam, exercitationem laborum quaerat rerum repellendus voluptatibus quod quae impedit officia quas.",
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
     
      {/* <h1>Dashboard</h1> */}
      {/* <Payment></Payment> */}

      <ToastContainer />
      <Footer></Footer>
    </>
  );
}

export default HomePage;
