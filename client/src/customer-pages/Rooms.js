import React, { useEffect, useState } from "react";
import "../styles/components/rooms.css";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import { fetchGetAPI } from "../components/UserFunctions";
import {API_getAllRooms} from "../api/index";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {room_main} from "../image/index";
export default function Rooms() {
  const [rooms,setRooms] =useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function getAllRooms()
  {
    setLoading(true);
    const response = await fetchGetAPI(API_getAllRooms);
    const json = await response.json();
    console.log(json);
    setRooms(json.rooms);
    setLoading(false);
  }
  
  const headerData = {
    title: "Rooms",
    sub_title:
      "Our generous guest rooms at Coconut County Resort boast breathtaking views and exclusive amenities",
    image: "room_header.jpg",
  };
  useEffect(()=>{
    getAllRooms();
  },[])
  return (
    <>
      <Navbar></Navbar>
      {loading && <LoadingSpinner/>}
      <Header data={headerData}></Header>
      <div className="rooms-page">
        <div className="overview">
          <div className="overview-container">
            <div className="container-item img-container">
              <img className="img" src={room_main} />
            </div>
            <div className="container-item info-container">
              <h2 className="title">OUR ROOMS</h2>
              <p className="sub-title">
                {" "}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora alias placeat deleniti voluptates debitis quibusdam
                quidem inventore distinctio. Nostrum itaque soluta recusandae
                repudiandae? Cum facere, dolores vel aliquam libero
                perspiciatis?<br></br>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                reiciendis quisquam in et asperiores omnis repellat vitae
                placeat id doloribus? Sed rerum repellendus voluptates molestias
                cumque illo nisi consequatur assumenda.
              </p>
              <button className="button globle_button_design" onClick={()=>{
                  navigate("/booking")
                }}>
                
                Check Availability
              </button>
            </div>
          </div>
        </div>

        <div className="rooms">
          {rooms.length !== 0  && rooms.map((room) => {
           return (<div className="rooms-container">
              <div className="container-item img-container">
                <img className="img" src={`/img/rooms/${room.mainImage}`} />
              </div>
              <div className="container-item info-container">
                <h2 className="title">{room.title}</h2>
                <p className="sub-title">
                  
                  {room.description}
                </p>
                <button className="button globle_button_design" onClick={()=>{
                  navigate("/rooms/" + room._id)
                }}>Explore</button>
              </div>
            </div>);
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
