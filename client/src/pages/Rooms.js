import React from "react";
import Navbar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import BookWidget from "../components/BookWidget";
const { rooms } = require("../components/RoomData");

export default function Rooms(props) {
  return (
    <>
      <Navbar />
      <BookWidget/>
      {
        rooms.map((room)=>{
         return (<RoomCard room = {room}></RoomCard>)
        })
      }
      
      {/* {rooms} */}
    </>
  );
}
