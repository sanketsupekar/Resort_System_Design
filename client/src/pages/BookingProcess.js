import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';

import '../styles/components/bookingProcess.css';
const {displayIcon} = require('../components/UserFunctions');

export default function BookingProcess() {
    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
       if(state == null)
       {
        navigate('/pageNotFound');
       }     
    },[])
  return (
    <>
    <NavBar></NavBar>
    <div className="booking_process">
    <div className="room_info_card">
      <div className="card_container">
        <div className="img_container">
          {/* <h1>Image</h1> */}
          <img
            src={"/img/rooms/" + state.room.mainImage}
            alt="room_image"
          ></img>
        </div>
        <div className="info_container">
          <div className="room_name">
            <h2>{state.room.title}</h2>
            <p>{state.room.description}</p>
            <p> {state.room.paragraph}</p>
          </div>
          <div className="room_details">
              <div className="detail-1">
                <h3>Size :</h3>
                <p>{state.room.size}</p>
              </div>
              {/* <div className="detail-2">
                <h3>Occupancy :</h3>
                <p>
                  {state.room.adults} Adults & {state.room.children} Children
                </p>
              </div> */}
           
            <div className="detail-3">
              <h3>Bedding :</h3>
              <p>{state.room.bedding}</p>
            </div>
            <div className="detail-4">
              <h3>Amenities :</h3>
              {state.room.amenities.map((item, index) => (
                <i key={index} className={displayIcon(item)}></i>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
    
  </>
  );
}
