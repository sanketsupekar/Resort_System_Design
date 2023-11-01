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
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
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
