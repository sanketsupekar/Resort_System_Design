import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Fragment } from "react";
// import "../styles/components/bookingProcess.css";
import Header from "../components/Header";
import "../styles/components/roomDetails.css";
import AmenitiesCard from "../components/AmenitiesCard";
import Footer from "../components/Footer";
const { API_getRoomDetails } = require("../api/index");
const { displayIcon, fetchAPI } = require("../components/UserFunctions");

export default function RoomDetails() {

  const {roomId} = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [room, setRoom] = useState({});

  const headerData = {
    title: room.title,
    sub_title: room.titleHeader,
    image: room.mainImage,
  };
  async function getRoomDetails()
  {
    const data = {_id : roomId};
    const respones = await fetchAPI(data,API_getRoomDetails,"POST");
    const json = await respones.json();
    setRoom(json);
    setLoading(false);
    console.log(json);
  }
useEffect(()=>{
  getRoomDetails();
},[])
  return (
    <>
      <NavBar></NavBar>
      {/* <h1>{roomId}</h1> */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Header data={headerData} />
          <div className="room_information">
            <div className="booking_process_container">
              <div className="room_info_card">
                <div className="card_container_1">
                  <div className="info_container">
                    <div className="room_name">
                      <h2>{room.title}</h2>
                      <p> {room.description}</p>
                      <p> {room.paragraph}</p>
                    </div>
                    <div className="room_details">
                      <div className="detail-1">
                        <h3 className="margin-zero">Size :</h3>
                        <p className="margin-zero">{room.size}</p>
                      </div>
                      <div className="detail-2">
                        <h3 className="margin-zero">Occupancy :</h3>
                        <p className="margin-zero">
                          {room.adults} Adults & {room.children} Children
                        </p>
                      </div>

                      <div className="detail-3">
                        <h3 className="margin-zero">Bedding :</h3>
                        <p className="margin-zero">{room.bedding}</p>
                      </div>
                      <div className="detail-4">
                        <h3 className="margin-zero">View :</h3>
                        <p className="margin-zero">{room.view}</p>
                      </div>
                      <div className="detail-4">
                        <h3 className="margin-zero">Price :</h3>
                        <p className="margin-zero">{"INR " + room.price + " / Day"}</p>
                      </div>
                      {/* <div className="detail-4">
                        <h3>Amenities :</h3>
                        {room.amenities.map((item, index) => (
                          <i key={index} className={displayIcon(item)}></i>
                        ))}
                      </div> */}
                    </div>
                  </div>
                  <div className="img_container">
                    {/* <h1>Image</h1> */}
                    <img
                      src={"/img/rooms/" + room.subImage}
                      alt="room_image"
                    ></img>
                  </div>
                </div>
                <div className="card_container_2">
                  <div className="amenitiens_container">
                    <h1>Animities</h1>
                    <div className="card_container">
                      {room.amenities.map((amenity) => {
                        return <AmenitiesCard name={amenity} />;
                      })}
                    </div>
                  </div>

                  <div className="gallary_container">
                    <h1>Gallary</h1>

                    <div className="card_container">
                      <div className="head_image">
                        <img
                          className="imgBoxHead"
                          src={`/img/rooms/${String(room.mainImage).split('_')[0]}_room_gallary_1.jpg` }
                        ></img>
                      </div>

                      <div className="sub_image">
                        <img
                          className="imgBox"
                          src={`/img/rooms/${String(room.mainImage).split('_')[0]}_room_gallary_2.jpg` }
                        ></img>

                        <img
                          className="imgBox"
                          src={`/img/rooms/${String(room.mainImage).split('_')[0]}_room_gallary_3.jpg` }
                        ></img>

                        <img
                          className="imgBox"
                          src={`/img/rooms/${String(room.mainImage).split('_')[0]}_room_gallary_4.jpg` }
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <Footer></Footer>
        </Fragment>
       
      )}
    </>
  );
}
