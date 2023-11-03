import React, { useState } from "react";
import "../styles/admin-styles/adminBookings.css";
import SearchWidget from "../admin-components/SearchWidget";
import BookingListCard from "../admin-components/BookingListCard";
import DateLineCard from "../admin-components/DateLineCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {fetchAPI} from "../components/UserFunctions";
import { API_ADMIN_getBookings } from "../api";
import Navbar from "../admin-components/NavBar";
import AdminHeader from "../admin-components/AdminHeader";
// AdminHeader
export default function AdminBookings() {
  const data = {
    title: "Resort Bookings",
    sub_title:
      "Here is all bookings",
      image : "admin_booking_header.jpg"
  };
  const card = {
    bookingId: "12345678",
    customerName: "Sanket Supekar",
    roomName: "Delux Room",
    checkInDate: new Date(),
    checkOutDate: new Date(),
  };
  const [bookings,setBookings] = useState([]);
  const [loading,setLoading] = useState(false);

  async function getBookingsDateWise(data)
  {
    setLoading(true);
    const respones  = await fetchAPI(data,API_ADMIN_getBookings,"POST");
    const json = await respones.json();
    setLoading(false);
    setBookings(json.bookings)
    console.log(json);
  }
  function dateOnChangeHandle(data) {
    console.log(data);
    getBookingsDateWise(data);
  }
  return (
    <>

    <Navbar></Navbar>
    <div className="admin-bookings">
    <AdminHeader data = {data}></AdminHeader>
      {loading && <LoadingSpinner></LoadingSpinner>}
      <SearchWidget dateOnChangeHandle={dateOnChangeHandle}></SearchWidget>
      {/* <div>AdminHome</div> */}

     {bookings.length > 0 && bookings.map((booking,index)=>{
          return (<BookingListCard card={booking}></BookingListCard>)
     }) }
    </div>
    </>
  );
}
