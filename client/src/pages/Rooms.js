import React from "react";
import Navbar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
const { rooms } = require("../components/RoomData");

export default function Rooms(props) {
  return (
    <>
      <Navbar />
      {
        rooms.map((room)=>{
         return (<RoomCard room = {room}></RoomCard>)
        })
      }
      
      {/* {rooms} */}
    </>
  );
}
