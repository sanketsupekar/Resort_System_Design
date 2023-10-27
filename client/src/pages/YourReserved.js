import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import "../styles/components/yourReserved.css";
import ReservedCard from "../components/ReservedCard";
import {fetchGetAPI,isLoggedIn } from "../components/UserFunctions";
import { API_getBookedCard } from "../api/index";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import PageNotFound from "./PageNotFound";
export default function YourReserved() {
  const headerData = {
    title: "Your Reserved",
    sub_title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod autem commodi iste eum omnis saepe temporibus? Veniam ipsam, exercitationem laborum quaerat rerum repellendus voluptatibus quod quae impedit officia quas.",
      image : "reserved_header.jpg"
  };
  const [bookedCards, setBookedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLogin] = useState(isLoggedIn());
  // function handleBookingDetails(bookingId)
  async function getBookingCardDetails() {
    setLoading(true);
    const respones = await fetchGetAPI(API_getBookedCard);
    const json = await respones.json();
    setBookedCards(json);
    setLoading(false);
    console.log(json);
  }
  useEffect(() => {
    getBookingCardDetails();
  },[]);
  return (
    <Fragment>
     {loggedIn && <Fragment>
     <Navbar></Navbar>
      {loading ? <LoadingSpinner/> : <Fragment/>}
      <Header data = {headerData}/>
      <div className="yourReserved">
        <div className="booked_card_container">
          {bookedCards.length === 0 ? <h1>No Booking Found</h1> : bookedCards.map((card)=>{
            return <ReservedCard card = {card}></ReservedCard>
          })}
         
        </div>
      </div>
      </Fragment>}
      {!loggedIn && <PageNotFound></PageNotFound>}
    </Fragment>
  );
}
