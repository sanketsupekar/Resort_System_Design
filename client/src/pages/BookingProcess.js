import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Fragment } from "react";
import "../styles/components/bookingProcess.css";
const { API_getRoomDetails } = require("../api/index");
const { displayIcon, fetchAPI } = require("../components/UserFunctions");

export default function BookingProcess() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    amenities: [],
    title: "",
    description: "",
    view: "",
    size: "",
    bedding: "",
    paragraph: "",
    mainImage: "",
    subImage: "",
    price: 0,
  });

  

  async function getRoomDetails(roomId) {
    setLoading(true);
    const respones = await fetchAPI(roomId, API_getRoomDetails, "POST");
    const json = await respones.json();
    setLoading(false);
    if (json.success) {
      setRoom(json);
    } else {
     navigate("/pageNotFound");
    //  console.log(json);
    }
  }
  function handlePayNowClick() {
    
    navigate('/rooms/bookingProcess/payment',{state : {
      bookingId : state._id,
      amount : state.amount,
    }});
    // console.log(state);
  }
  useEffect(() => {
    if (state == null) {
      navigate("/pageNotFound");
    }
    // console.log(state._id);
    getRoomDetails({ _id: state.roomId });
    // console.log(state);
  }, []);
  // useEffect(() => {
  //   // console.log(payment);
  // }, [payment]);
  return (
    <>
      <NavBar></NavBar>
      {loading ? <LoadingSpinner /> : <Fragment>
      <div className="booking_process">
        <div className="booking_process_container">
          <div className="room_info_card">
            <div className="card_container">
              <div className="img_container">
                {/* <h1>Image</h1> */}
                <img
                  src={"/img/rooms/" + room.mainImage}
                  alt="room_image"
                ></img>
              </div>
              <div className="info_container">
                <div className="room_name">
                  <h2>{room.title}</h2>
                  <p>{room.description}</p>
                  <p> {room.paragraph}</p>
                </div>
                <div className="room_details">
                  <div className="detail-1">
                    <h3>Size :</h3>
                    <p>{room.size}</p>
                  </div>
                  {/* <div className="detail-2">
                <h3>Occupancy :</h3>
                <p>
                  {room.adults} Adults & {room.children} Children
                </p>
              </div> */}

                  <div className="detail-3">
                    <h3>Bedding :</h3>
                    <p>{room.bedding}</p>
                  </div>
                  <div className="detail-4">
                    <h3>Amenities :</h3>
                    {room.amenities.map((item, index) => (
                      <i key={index} className={displayIcon(item)}></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="booking_summary">
            <div className="container">
              <div>
                <h2>Booking Details</h2>
              </div>
              <div className="booking_details">
                <div className="item">
                  <h4>Room Name </h4>
                  <h4>Check-In </h4>
                  <h4>Check-Out </h4>
                  <h4>Total Days </h4>
                </div>
                <div className="item">
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                </div>
                <div className="item">
                  <p>{room.title}</p>
                  <p>{new Date(state.checkInDate).toDateString()}</p>
                  <p>{new Date(state.checkOutDate).toDateString()}</p>
                  <p>{state.totalDays} Days</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div>
                <h2>Payment Details</h2>
              </div>
              <div className="booking_details">
                <div className="item">
                  <h4>Total Amount (INR)</h4>
                  <h4>Payment Mode </h4>
                  <h4>Payment Status</h4>
                  {/* <h4> </h4> */}
                </div>
                <div className="item">
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  {/* <h4>:</h4> */}
                </div>
                <div className="item">
                  <p>{room.price * state.totalDays} </p>
                  <p>Net Banking</p>
                  <p>Pending</p>
                  {/* <p>{state.totalDays} Days</p> */}
                </div>
              </div>
            </div>
            <button
              className="globle_button_design payment_button"
              onClick={handlePayNowClick}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div> </Fragment>}
    </>
  );
}
