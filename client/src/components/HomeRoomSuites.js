import React from "react";
import "../styles/components/homeRoomSuites.css";
import Navbar from "../components/NavBar";
import {delux_room,standard_room,king_room} from "../image/index";
export default function HomeRoomSuites() {
  return (
    <>
      {/* <Navbar></Navbar> */}

      <section className="room-suites-component">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-md-7">
            <h2 className="heading" data-aos="fade-up">Rooms &amp; Suites</h2>
            <p className="sub-heading" data-aos="fade-up" data-aos-delay="100">Welcome to our resort rooms – where luxury meets comfort. Experience elegance and tranquility in every detail. Your perfect getaway starts here.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-4" data-aos="fade-up">
            <a href="/rooms" className="room">
              <figure className="img-wrap">
                <img src={delux_room}alt="Free website template" className="img-fluid mb-3"/>
              </figure>
              <div className="p-3 text-center room-info">
                <h2>Single Room</h2>
                <span className="text-uppercase letter-spacing-1">INR 2000/- per night</span>
              </div>
            </a>
          </div>

          <div className="col-md-6 col-lg-4" data-aos="fade-up">
            <a href="/rooms" className="room">
              <figure className="img-wrap">
                <img src={standard_room}alt="Free website template" className="img-fluid mb-3"/>
              </figure>
              <div className="p-3 text-center room-info">
                <h2>Family Room</h2>
                <span className="text-uppercase letter-spacing-1">INR 3000/- per night</span>
              </div>
            </a>
          </div>

          <div className="col-md-6 col-lg-4" data-aos="fade-up">
            <a href="/rooms" className="room">
              <figure className="img-wrap">
                <img src={king_room} alt="Free website template" className="img-fluid mb-3"/>
              </figure>
              <div className="p-3 text-center room-info">
                <h2>Presidential Room</h2>
                <span className="text-uppercase letter-spacing-1">INR 4000/- per night</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
