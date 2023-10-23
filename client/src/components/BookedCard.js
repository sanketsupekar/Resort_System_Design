import React, { Fragment, useEffect } from "react";
import Navbar from "../components/NavBar";
import "../styles/components/bookedCard.css";
import bootstrap from "bootstrap";

export default function BookedCard(props) {
  // const bookedCard = {
  //   roomName: "Deluxe Bedroom",
  //   roomHeader:
  //     "Coconut County Resort's classic room is the perfect beginning to your Nashik adventure",
  //   bookingAmount: 16000,
  //   paymentDate: "Mon, December 24",
  //   //  arrivalDate: "Mon, December 24",
  //   checkInDate: "Mon, June 25",
  //   checkOutDate: "Mon, June 26",
  // };
function getDateString(date)
{
  return new Date(date).toDateString();
}
  useEffect(() => {
    // console.log(props.card);
  }, []);
  return (
    <Fragment>
      <div
        className="booking-card"
        style={{
          backgroundImage: `url(/img/rooms/${props.card.roomImage}`,
        }}
      >
        <div className="book-container">
          <div className="content">
            <button className="btn">Booked</button>
          </div>
        </div>
        <div className="informations-container">
          <h2 className="title">{props.card.roomName}</h2>
          <p className="sub-title">{props.card.roomHeader}</p>
          <p className="price">
            <svg
              className="icon"
              style={{ width: "20px", height: "20px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z"
              />
            </svg>
            {props.card.bookingAmount}
          </p>
          {/* <p>Sanket Supekar</p> */}
          <div className="more-information">
            <div className="info-and-date-container">
              <div className="track_container">
                <div className="row">
                  <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                    <div className="track_box">
                      <div className="order-tracking completed">
                        <span className="is-complete"></span>
                        <p>
                          Payment
                          <br />
                          <span>{getDateString(props.card.paymentDate)}</span>
                        </p>
                      </div>
                      <div
                        className={`order-tracking   ${
                          props.card.arrivalDate === undefined
                            ? ""
                            : "completed"
                        }`}
                      >
                        <span className="is-complete"></span>
                        <p>
                          Arrival
                          <br />
                          <span>
                            {getDateString(props.card.arrivalDate == undefined
                              ? props.card.checkInDate
                              : props.card.arrivalDate)}
                          </span>
                        </p>
                      </div>
                      <div
                        className={` order-tracking  ${
                          props.card.departureDate == undefined
                            ? ""
                            : "completed"
                        }`}
                      >
                        <span className="is-complete"></span>
                        <p>
                          Departure
                          <br />
                          <span>
                            {getDateString(props.card.departureDate == undefined
                              ? props.card.checkOutDate
                              : props.card.departureDate)}
                          </span>
                        </p>
                      </div>
                      <div
                        className={`order-tracking ${
                          props.card.completedDate == undefined
                            ? ""
                            : "completed"
                        }`}
                      >
                        <span className="is-complete"></span>
                        <p>
                          Completed
                          <br />
                          <span>
                            {getDateString(props.card.completedDate == undefined
                              ? props.card.checkOutDate
                              : props.card.completedDate)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="disclaimer">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
              eveniet perferendis culpa. Expedita architecto nesciunt, rem
              distinctio
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
