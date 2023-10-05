import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import BookWidget from "../components/BookWidget";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate, useNavigate } from "react-router-dom";
// const { rooms } = require("../components/RoomData");
const { API_availableRooms } = require("../api/index");
const { fetchAPI } = require("../components/UserFunctions");
export default function Rooms(props) {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const [checkAvailability, setCheckAvailability] = useState({
    startDate: new Date(),
    endDate: new Date(),
    totalDays: 1,
    adult: 0,
    children: 0,
  });

  async function getAvailableRooms(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_availableRooms, "POST");
    const json = await respones.json();
    setLoading(false);
    setRooms(json);
    // console.log(rooms);
  }
  function handleCheckAvailability(data) {
    setCheckAvailability({
      ...checkAvailability,
      ...data,
    });
  }

  function handleBookRoom(data) {
    const roomDetailsToBook = {
      room: { ...data },
      checkInDate: checkAvailability.startDate,
      checkOutDate: checkAvailability.endDate,
      adults: checkAvailability.adult,
      children: checkAvailability.children,
      totalDays: checkAvailability.totalDays,
      totalPrice: checkAvailability.totalDays * data.price,
    };
    console.log(roomDetailsToBook);
    navigate("./bookingProcess", {
      state: { ...roomDetailsToBook },
    });
  }
  useEffect(() => {
    getAvailableRooms(checkAvailability);
  }, [checkAvailability]);
  return (
    <>
      <Navbar />
      {loading ? <LoadingSpinner /> : <Fragment />}
      <BookWidget handleCheckAvailability={handleCheckAvailability} />
      {rooms.map((room, key) => {
        return (
          <RoomCard
            room={room}
            totalDays={checkAvailability.totalDays}
            handleBookRoom={handleBookRoom}
          ></RoomCard>
        );
      })}

      {/* {rooms} */}
    </>
  );
}
