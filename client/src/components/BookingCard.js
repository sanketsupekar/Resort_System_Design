import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../styles/components/bookingCard.css";
const { displayIcon } = require("./UserFunctions");
const { reservedIcon } = require("../image/index");
const { displayError, displaySuccess } = require("../components/NotifyToast");
const { fetchAPI, fetchGetAPI } = require("../components/UserFunctions");
const {
  API_roomNotification,
  API_getroomNotification,
} = require("../api/index");

export default function BookingCard(props) {
  const [loadingVisible, setLoading] = useState(false);

  const [reservedInfo, setReservedInfo] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [isNotified, setIsNotified] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState([]);
  // const [roomReserved, setRoomReserved] = useState(false);

  function onChangeReservedInfo() {
    setReservedInfo(!reservedInfo);
  }
  async function getNotificationDetails() {
    setLoading(true);
    const respones = await fetchGetAPI(API_getroomNotification);
    const json = await respones.json();
    setNotificationDetails(json);
    setLoading(false);

  }
  useEffect(() => {
    getNotificationDetails();
  }, []);

  useEffect(() => {
    const result = notificationDetails.find((notification) => {
      return notification.roomId === props.room._id;
    });
    setIsNotified(result);
  }, [notificationDetails]);

  return (
    <>
      <div className="booking_card">
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
                {props.room.reserved && reservedInfo && (
                  <p className="reserved_info">
                    Reserved From{" "}
                    {new Date(
                      props.room.booked.checkInDate
                    ).toLocaleDateString()}{" "}
                    To{" "}
                    {new Date(
                      props.room.booked.checkOutDate
                    ).toLocaleDateString()}
                  </p>
                )}
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
            {props.room.reserved ? (
              <div className="reserved-corner">
                {/* onMouseLeave={onChangeReservedInfo} */}
                <div className="">
                  {" "}
                  <img
                    className="reserved_icon"
                    onMouseEnter={onChangeReservedInfo}
                    src={reservedIcon}
                  />
                </div>
                {/* send Notification to the customer  */}
                <div>
                  {" "}
                  {/* <button
                    className="bell-icon "
                    onClick={() => {
                      handleNotificationData(props.room);
                    }}
                    disabled={isNotified}
                  >
                    {isNotified ? (
                      <i
                        class="fa-solid fa-bell"
                        style={{ color: "#c3b309" }}
                      ></i>
                    ) : (
                      <i
                        class="fa-regular fa-bell fa-beat-fade"
                        style={{ color: "#434044" }}
                      ></i>
                    )}
                  </button> */}
                  <button
                    className="bell-icon"
                    onClick={() => {
                      props.handleNotifyClick(props.room._id);
                      setIsNotified(!isNotified);
                    }}
                    disabled={isNotified}
                  >
                    {isNotified ? (
                      <i
                        className="fa-solid fa-bell"
                        style={{ color: "rgb(239 222 27)" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-bell fa-beat-fade"
                        style={{ color: "#434044" }}
                      ></i>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  className="book_button"
                  onClick={() => {
                    props.handleBookRoom(props.room);
                  }}
                >
                  Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
