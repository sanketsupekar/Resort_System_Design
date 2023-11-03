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
            
                Indulge in the epitome of luxury at our resort's rooms. Each space is thoughtfully crafted to provide a perfect blend of elegance and comfort. Immerse yourself in a stylish ambiance, adorned with modern amenities and adorned with exquisite decor. Wake up to picturesque views, relax in plush furnishings, and experience unparalleled tranquility. Our rooms offer not just accommodation, but a sanctuary where your every need is met with seamless hospitality. Whether you choose a cozy retreat or a lavish suite, expect a stay that redefines relaxation. Welcome to a world of sophistication and serenity, where your comfort is our utmost priority.
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
