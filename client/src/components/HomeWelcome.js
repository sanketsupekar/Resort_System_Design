import React from "react";
import "../styles/components/homeWelcome.css";
import Navbar from "../components/NavBar";
import {resort_front_view,resort_round_view} from "../image/index"
export default function HomeWelcome() {
  return (
    <>
      <Navbar></Navbar>

      <section className="welcome-component">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-md-12 col-lg-7 ml-auto order-lg-2 position-relative mb-5"
              data-aos="fade-up"
            >
              <figure className="img-absolute">
                <img
                  src={resort_round_view}
                  alt="Image"
                  className="img-fluid"
                />
              </figure>
              <img
                src={resort_front_view}
                alt="Image"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-12 col-lg-4 order-lg-1" data-aos="fade-up">
              <h2 className="heading">Welcome!</h2>
              <p className="mb-4">
             Place where every moment is a whisper of paradise. Embrace the tranquility, indulge in luxury, and let the tropical charm of our resort envelop your senses. Your unforgettable escape begins here, where the sun, sea, and smiles await to greet you.
              </p>
              {/* <p>
                <a
                  href="#"
                  className="learn-more-btn btn-primary text-white py-2 mr-3"
                >
                  Learn More
                </a>{" "}
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
