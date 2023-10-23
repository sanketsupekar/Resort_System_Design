import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import "../styles/components/bookings.css";
import BookedCard from "../components/BookedCard";
import {fetchGetAPI } from "../components/UserFunctions";
import { API_getBookedCard } from "../api/index";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Bookings() {
  const [bookedCards, setBookedCards] = useState([]);
  const [loading, setLoading] = useState(false);
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