import React, { useState } from "react";
import "../styles/components/homePhotos.css";
import { resort_slide } from "../image/index";
// import Navbar from "../components/NavBar";
export default function HomePhotos() {
  const [index, setIndex] = useState(0);
  return (
    <>
      {/* <Navbar></Navbar> */}

      <section className="photos-component">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-md-7">
              <h2 className="heading" data-aos="fade-up">
                Photos
              </h2>
              <p data-aos="fade-up" data-aos-delay="100">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </div>
          </div>
          <div className="slide-container">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {resort_slide.map((image, key) => {
                  return (
                    <li
                      data-slide-to={index}
                      className={index == key ? "active" : ""}
                    ></li>
                  );
                })}
              </ol>
              <div className="carousel-inner">
                {resort_slide.map((image, key) => {
               return   (<div
                    className={
                      index == key ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <img
                      className="img  d-block w-100"
                      src={image}
                      alt="First slide"
                    />
                  </div>);
                })}
              </div>
              {index > 0 && (
                <a
                  className="carousel-control-prev"
                  // href="#carouselExampleIndicators"
                  role="button"
                  onClick={() => {
                    setIndex((index - 1) % resort_slide.length);
                  }}
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
              )}
              {index < resort_slide.length && (
                <a
                  className="carousel-control-next"
                  // href="#carouselExampleIndicators"
                  role="button"
                  onClick={() => {
                    setIndex((index + 1) % resort_slide.length);
                  }}
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
