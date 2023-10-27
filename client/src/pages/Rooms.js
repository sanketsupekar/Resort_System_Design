import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import BookWidget from "../components/BookWidget";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CustomerProfileCard from "../components/CustomerProfileCard";
import PageNotFound from "./PageNotFound"
// const { rooms } = require("../components/RoomData");
const { isLoggedIn } = require("../components/UserFunctions");

const { API_availableRooms } = require("../api/index");
const { fetchAPI } = require("../components/UserFunctions");
const { API_roomBookProcess } = require("../api/index");
const headerData = {
  title: "Rooms",
  sub_title:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod autem commodi iste eum omnis saepe temporibus? Veniam ipsam, exercitationem laborum quaerat rerum repellendus voluptatibus quod quae impedit officia quas.",
  image: "room_header.jpg",
};
export default function Rooms(props) {
  const [loggedIn, setLogin] = useState(isLoggedIn());
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const [checkAvailability, setCheckAvailability] = useState({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalDays: 1,
    adults: 1,
    childrens: 0,
  });
  const [booking, setBooking] = useState({
    customerId: null,
    // paymentId: null,
    roomId: null,
    serviceType: "Room", // Type of service being booked (e.g., hotel, flight, event)
    serviceDetails: "Booking Of Rooms", // Details about the specific service being booked
    adults: checkAvailability.adults, // Number of adults included in the booking
    childrens: checkAvailability.childrens, // Number of children included in the booking
    checkInDate: checkAvailability.checkInDate, // Date of check-in for the service
    checkOutDate: checkAvailability.checkOutDate, // Date of check-out for the service
    totalDays: checkAvailability.totalDays,
    dateOfBooking: null, // Date when the booking was made
    bookingStatus: "Pending", // Status of the booking (e.g., Pending, Confirmed, Canceled)
    paymentStatus: "Pending", // Status of the payment associated with the booking
  });

  async function getAvailableRooms(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_availableRooms, "POST");
    const json = await respones.json();
    // console.log(json);
    setLoading(false);
    setRooms(json);
  }

  async function roomBookProcess(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_roomBookProcess, "POST");
    const json = await respones.json();
    setLoading(false);
    if (!json.success) {
      return false;
    } else {
      navigate("/rooms/bookingProcess", {
        state: {
          ...json._doc,
        },
      });
      console.log(json);
      return true;
    }
  }

  function handleCheckAvailability(data) {
    setCheckAvailability({
      ...checkAvailability,
      ...data,
    });
  }
  function handleBookRoom(data) {
    setBooking({
      ...booking,
      ...checkAvailability,
      roomId: data._id,
    });
  }
  useEffect(() => {
    getAvailableRooms(checkAvailability);
  }, [checkAvailability]);

  useEffect(() => {
    // console.log(booking);
    if (booking.roomId != null) {
      roomBookProcess(booking);
    }
  }, [booking]);
  return (
    <Fragment>
      {loggedIn ? (
        <Fragment>
          <Navbar />
          {loading ? <LoadingSpinner /> : null}
          <Header data={headerData} />
          <BookWidget handleCheckAvailability={handleCheckAvailability} />
          {rooms.length === 0 ? (
            <h1></h1>
          ) : (
            rooms.map((room, key) => (
              <RoomCard
                key={key}
                room={room}
                totalDays={checkAvailability.totalDays}
                handleBookRoom={handleBookRoom}
              />
            ))
          )}
        </Fragment>
      ) : (
        <PageNotFound></PageNotFound>
      )}
    </Fragment>
  );
}
