import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import "../styles/components/bookings.css";
import BookedCard from "../components/BookedCard";
import {fetchGetAPI } from "../components/UserFunctions";
import { API_getBookedCard } from "../api/index";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";

export default function Bookings() {
  const headerData = {
    title: "Booking",
    sub_title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod autem commodi iste eum omnis saepe temporibus? Veniam ipsam, exercitationem laborum quaerat rerum repellendus voluptatibus quod quae impedit officia quas.",
      image : "booking_header.jpg"
  };
  const [bookedCards, setBookedCards] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <Navbar></Navbar>
      {loading ? <LoadingSpinner/> : <Fragment/>}
      <Header data = {headerData}/>
      <div className="bookings">
        <div className="booked_card_container">
          {bookedCards.length === 0 ? <h1>No Booking Found</h1> : bookedCards.map((card)=>{
            return <BookedCard card = {card}></BookedCard>
          })}
         
        </div>
      </div>
    </Fragment>
  );
}
