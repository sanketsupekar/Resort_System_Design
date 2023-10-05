import React from "react";
import Navbar from "./NavBar";
import "../styles/components/RoomCard.css";
import { rooms } from "./RoomData";
const {displayIcon} = require('./UserFunctions');
export default function RoomCard(props) {
  return (
    <>
      <div className="room_card">
        <div className="card_container">
          <div className="img_container">
            {/* <h1>Image</h1> */}
            <img
              src={"/img/rooms/" + props.room.mainImage}
              alt="room_image"
            ></img>
          </div>
          <div className="info_container">
            <div className="room_name">
              <h2>{props.room.title}</h2>
            </div>
            <div className="room_details">
              <div className="room_size_occu">
                <div className="detail-1">
                  <h3>Size :</h3>
                  <p>{props.room.size}</p>
                </div>
                <div className="detail-2">
                  <h3>Occupancy :</h3>
                  <p>
                    {props.room.adults} Adults & {props.room.children} Children
                  </p>
                </div>
              </div>
              <div className="detail-3">
                <h3>Bedding :</h3>
                <p>{props.room.bedding}</p>
              </div>
              <div className="detail-4">
                <h3>Amenities :</h3>
                {props.room.amenities.map((item, index) => (
                  <i key={index} className={displayIcon(item)}></i>
                ))}
              </div>
            </div>
          </div>
          <div className="book_container">
            <div className="price_info">
              <div className="price_info_1">
                <h5>Daily Price</h5>
                <h2>Rs.{props.room.price}</h2>
              </div>
              <div className="price_info_2">
                <h5>Total {props.totalDays} Days Price</h5>
                <h2>Rs.{props.room.price * props.totalDays}</h2>
              </div>
            </div>
            <div>
              <button className="book_button" onClick={()=> {props.handleBookRoom(props.room)}}>Book</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
