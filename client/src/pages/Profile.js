import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import "../styles/components/bookings.css";
import BookedCard from "../components/BookedCard";
import {fetchGetAPI,isLoggedIn } from "../components/UserFunctions";
import { API_getProfileDetails } from "../api/index";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import PageNotFound from "./PageNotFound";
export default function Profile() {
//   const headerData = {
//     title: "Sanket Supekar",
//     sub_title:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod autem commodi iste eum omnis saepe temporibus? Veniam ipsam, exercitationem laborum quaerat rerum repellendus voluptatibus quod quae impedit officia quas.",
//       image : "resort_header.jpg"
//   };
//   const [bookedCards, setBookedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLogin] = useState(isLoggedIn());
  const [headerData, setHeaderData] = useState({})
  // function handleBookingDetails(bookingId)
  async function getProfileDetails() {
    // setLoading(true);
    const respones = await fetchGetAPI(API_getProfileDetails);
    const json = await respones.json();
    // setBookedCards(json);
    setLoading(false);
    setHeaderData({
        title : json.name,
        sub_title : json.email,
        image : "resort_header.jpg",
        button_name : "log out",
    });
    // console.log(json);
  }
  useEffect(() => {
     getProfileDetails();
  },[]);
  return (
    <Fragment>
     {loggedIn && <Fragment>
     <Navbar></Navbar>
      {loading ? <LoadingSpinner/> : <Fragment/>}
      {(headerData.title !== undefined) && <Header data = {headerData}/>}
      </Fragment>}
      {!loggedIn && <PageNotFound></PageNotFound>}
    </Fragment>
  );
}
