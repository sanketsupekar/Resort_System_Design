import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../styles/components/RoomCard.css";
const {displayIcon} = require('./UserFunctions');
const {reservedIcon} = require("../image/index")
export default function RoomCard(props) {
  const [reservedInfo, setReservedInfo] = useState(false);
  const [roomReserved, setRoomReserved] = useState(false);
  
  function onChangeReservedInfo()
  {
    setReservedInfo(!reservedInfo);
  }
  useEffect(()=>{
    if(props.room.booked !== undefined)
    {
      setRoomReserved(true)
      console.log(props.room.title + " Booked");
    }
    else
    {
      console.log(props.room.title + " Not Booked");
    }
    // console.log(props.room.booked);
  });
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
                    {props.room.adults} Adults & {props.room.childrens} Children
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
                {roomReserved && reservedInfo && <p className="reserved_info">Reserved From {new Date(props.room.booked.checkInDate).toLocaleDateString()} To {new Date(props.room.booked.checkOutDate).toLocaleDateString()}</p>}
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
            {
              roomReserved ? <div>
              <img  className= "reserved_icon" onMouseEnter={onChangeReservedInfo} onMouseLeave={onChangeReservedInfo} src={reservedIcon}/>
           
            </div> : <div>
              <button className="book_button" onClick={()=> {props.handleBookRoom(props.room)}}>Book</button>
            </div>
            }
            
          </div>
          
        </div>
        
      </div>
    </>
  );
}
