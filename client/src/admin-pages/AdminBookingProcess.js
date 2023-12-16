import React, { Fragment, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { displayIcon, fetchAPI, isLoggedIn } from "../components/UserFunctions";
// AmenitiesCard
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import "../styles/admin-styles/adminBookingProcess.css";
import {
  API_ADMIN_getCustomerDetails,
  API_ADMIN_getRoomDetails,
  API_ADMIN_getBookingDetails,
  API_ADMIN_getPaymentDetails,
  API_ADMIN_updateTrackingDate,
} from "../api";
import NavBar from "../admin-components/NavBar";
import { useEffect } from "react";
import AmenitiesCard from "../components/AmenitiesCard";
import { ToastContainer, toast } from "react-toastify";
const { displaySuccess, displayError } = require("../components/NotifyToast");
// fetchAPI
export default function AdminBookingProcess(props) {
  //use Navigate
  const bookedCard = {
    roomName: "King Bedroom",
    roomHeader:
      "Enjoy a spacious and relaxing environment during you stay at Coconut County Resort",
    roomImage: "king_room.jpg",
    amount: 2000,
    checkInDate: "2023-12-16T03:30:00.000Z",
    checkOutDate: "2023-12-16T02:30:00.000Z",
    paymentDate: "2023-12-16T09:04:33.350Z",
    _id: "657d6822cfa4cd416121c697",
  };
  const navigate = useNavigate();

  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLogin] = useState(isLoggedIn());
  const [room, setRoom] = useState({});
  const [customer, setCustomer] = useState({});
  const [booking, setBooking] = useState({});
  const [payment, setPayment] = useState({});
  const [dataFetch, setDataFetch] = useState(false);

  async function updateTrackingDate(dateType) {
    const data = {
      date: {
        [dateType]: new Date(),
      },
      bookingId: bookingId,
    };
    setLoading(true);
    //Update Date
    const respones = await fetchAPI(data, API_ADMIN_updateTrackingDate, "POST");
    //Get Booking
    const bookingRes = await fetchAPI({ _id: bookingId },API_ADMIN_getBookingDetails,"POST");
    const booking = await bookingRes.json();
    
    setBooking(booking._doc);
    setLoading(false);
    // getBookingDetails();
  }
  async function getBookingDetails() {
    setLoading(true);
    //Get Booking
    const bookingRes = await fetchAPI(
      { _id: bookingId },
      API_ADMIN_getBookingDetails,
      "POST"
    );
    const booking = await bookingRes.json();
    //Get Room
    const roomRes = await fetchAPI(
      { _id: booking._doc.roomId },
      API_ADMIN_getRoomDetails,
      "POST"
    );
    const room = await roomRes.json();
    //Get Customer
    const customerRes = await fetchAPI(
      { _id: booking._doc.customerId },
      API_ADMIN_getCustomerDetails,
      "POST"
    );
    const customer = await customerRes.json();
    const paymentRes = await fetchAPI(
      { paymentId: booking._doc.paymentId },
      API_ADMIN_getPaymentDetails,
      "POST"
    );
    const payment = await paymentRes.json();
    setLoading(false);
    setBooking(booking._doc);
    setRoom(room);
    setCustomer(customer);
    setPayment(payment._doc);
    setDataFetch(true);
    // console.log(booking);
    //  console.log(room);
    //  console.log(customer);
    // console.log(payment);
  }

  function getDateString(date = new Date()) {
    return new Date(date).toDateString();
  }
  function updateArrival() {
    if (booking.trackingDate.paymentDate && !booking.trackingDate.arrivalDate) {
      updateTrackingDate("arrivalDate");
    } else {
      displayError("Upadation Failed");
    }

    // alert("Arrival");
  }
  function updateDeparture() {
    if (
      booking.trackingDate.arrivalDate &&
      !booking.trackingDate.departureDate
    ) {
      updateTrackingDate("departureDate");
    } else {
      displayError("Upadation Failed");
    }
  }
  function updateCompleted() {
    if (
      booking.trackingDate.departureDate &&
      !booking.trackingDate.completedDate
    ) {
      updateTrackingDate("completedDate");
    } else {
      displayError("Upadation Failed");
    }
  }

  function handleInvoiceDetails() {
    navigate("/admin/paymentReceipt/" + bookingId);
  }
  useEffect(() => {
    getBookingDetails();
    console.log(booking);
  }, []);
  useEffect(() => {
    // handleInvoiceDetails();
  }, []);
  return (
    <>
      <Fragment>
        <NavBar></NavBar>
        {!dataFetch && <LoadingSpinner />}
        {dataFetch && (
          <Fragment>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Fragment>
                {/* <Header data={headerData} /> */}
                <div className="admin-booking-process">
                  <div className="room_information">
                    <div className="booking_process_container ">
                      <div className="room_info_card">
                        <div className="card_container_1">
                          <div className="info_container">
                            <div className="room_name">
                              <h2>{room.title}</h2>
                              {/* <p> {room.description}</p> */}
                              {/* <p> {room.paragraph}</p> */}
                            </div>
                            <div className="room_details">
                              <div className="detail-1">
                                <h3 className="margin-zero">Size :</h3>
                                <p className="margin-zero">{room.size}</p>
                              </div>
                              <div className="detail-2">
                                <h3 className="margin-zero">Occupancy :</h3>
                                <p className="margin-zero">
                                  {room.adults} Adults & {room.children}{" "}
                                  Children
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
                                <p className="margin-zero">
                                  {"INR " + room.price + " / Day"}
                                </p>
                              </div>
                              <div className="detail-5">
                                <h3 className="margin-zero">Amenities :</h3>
                                {room.amenities != undefined &&
                                  room.amenities.map((item, index) => (
                                    <i
                                      key={index}
                                      className={displayIcon(item) + " icon"}
                                    ></i>
                                  ))}
                              </div>
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
                      </div>
                    </div>
                  </div>
                  <div className="update-status">
                    <div className="update-status-container">
                      <div className="title-box">
                        <h2 className="title">Update Status</h2>
                      </div>
                      <div className="info-and-date-container">
                        <div className="track_container">
                          <div className="row">
                            <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                              <div className="track_box">
                                <div
                                  className={`order-tracking ${
                                    payment ? "completed" : ""
                                  }`}
                                >
                                  <span className="is-complete"></span>
                                  <p>
                                    Payment
                                    <br />
                                    <span>
                                      {getDateString(booking.paymentDate)}
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className={`order-tracking   ${
                                    booking.trackingDate.arrivalDate &&
                                    "completed"
                                  }`}
                                >
                                  <span
                                    className="is-complete"
                                    onClick={updateArrival}
                                  ></span>
                                  <p>
                                    Arrival
                                    <br />
                                    <span>
                                      {getDateString(
                                        booking.trackingDate.arrivalDate
                                          ? booking.trackingDate.arrivalDate
                                          : booking.checkInDate
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className={` order-tracking  ${
                                    booking.trackingDate.departureDate &&
                                    "completed"
                                  }`}
                                >
                                  <span
                                    className="is-complete"
                                    onClick={updateDeparture}
                                  ></span>
                                  <p>
                                    Departure
                                    <br />
                                    <span>
                                      {getDateString(
                                        booking.trackingDate.departureDate
                                          ? booking.trackingDate.departureDate
                                          : booking.checkOutDate
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className={`order-tracking ${
                                    booking.trackingDate.completedDate &&
                                    "completed"
                                  }`}
                                >
                                  <span
                                    className="is-complete"
                                    onClick={updateCompleted}
                                  ></span>
                                  <p>
                                    Completed
                                    <br />
                                    <span>
                                      {getDateString(
                                        booking.trackingDate.completedDate
                                          ? booking.trackingDate.completedDate
                                          : booking.checkOutDate
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking-information">
                    <div className="booking-information-container">
                      <div className="title-box">
                        <h2 className="title">Customer Details</h2>
                      </div>
                      <div className="infomation-box">
                        <div className="box-conatainer">
                          <div className="left-part part">
                            <p>First Name</p>
                            <p>last Name</p>
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="right-part part">
                            <p>{customer.firstName}</p>
                            <p>{customer.lastName}</p>
                          </div>
                        </div>
                        <div className="box-conatainer">
                          <div className="left-part part">
                            <p>Email Id</p>
                            <p>Phone Number</p>
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="right-part part">
                            <p>{customer.email}</p>
                            <p>{customer.phoneNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking-information">
                    <div className="booking-information-container">
                      <div className="title-box">
                        <h2 className="title">Booking Details</h2>
                      </div>
                      <div className="infomation-box">
                        <div className="box-conatainer">
                          <div className="left-part part">
                            <p>Amount</p>
                            <p>Total Days</p>
                            <p>Date Of Booking</p>
                            <p>Booking Status</p>
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="right-part part">
                            <p>{"INR " + booking.amount}</p>
                            <p>{booking.totalDays + " Days"}</p>
                            <p>
                              {new Date(booking.dateOfBooking).toDateString()}
                            </p>
                            <p>{booking.bookingStatus}</p>
                          </div>
                        </div>
                        <div className="box-conatainer">
                          <div className="left-part part">
                            <p>Check-In </p>
                            <p>Check-Out</p>
                            <p>Adults</p>
                            <p>Childrens</p>
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="right-part part">
                            <p>
                              {new Date(booking.checkInDate).toDateString()}
                            </p>
                            <p>
                              {new Date(booking.checkOutDate).toDateString()}
                            </p>
                            <p>{booking.adults}</p>
                            <p>{booking.childrens}</p>
                          </div>
                        </div>
                        {/* <div className="box-conatainer">
                          <div className="left-part part">
                            <p>Payment Date</p>
                            {booking.trackingDate.arrivalDate != undefined && (
                              <p>Arrival Date</p>
                            )}
                            {booking.trackingDate.departureDate !=
                              undefined && <p>Departure Date</p>}
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            {booking.trackingDate.arrivalDate != undefined && (
                              <p>: </p>
                            )}
                            {booking.trackingDate.departureDate !=
                              undefined && <p>: </p>}
                          </div>
                          <div className="right-part part">
                            <p>
                              {new Date(
                                booking.trackingDate.paymentDate
                              ).toDateString()}
                            </p>
                            {booking.trackingDate.arrivalDate != undefined && (
                              <p>
                                {new Date(
                                  booking.trackingDate.arrivalDate
                                ).toDateString()}
                              </p>
                            )}
                            {booking.trackingDate.departureDate !=
                              undefined && (
                              <p>
                                {new Date(
                                  booking.trackingDate.departureDate
                                ).toDateString()}
                              </p>
                            )}
                         
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="booking-information">
                    <div className="booking-information-container">
                      <div className="title-box">
                        <h2 className="title">Payment Details</h2>
                      </div>
                      <div className="infomation-box">
                        <div className="box-conatainer">
                          <div className="left-part part">
                            <p>Payment Date</p>
                            <p>Amount</p>
                            <p>Currancy</p>
                            <p>Payment Method</p>
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="right-part part">
                            <p>
                              {new Date(payment.paymentDate).toDateString()}
                            </p>
                            <p>{payment.amount}</p>
                            <p>{payment.currency}</p>

                            <p>{payment.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="box-conatainer">
                          <div className="left-part part">
                            {/* <p>Payment Method </p> */}
                            <p>Razorpay Order Id</p>
                            <p>Razorpay Payment Id</p>
                            <p>Transaction Fee</p>
                            <p>Transaction Tax</p>
                          </div>
                          <div className="mid-part part">
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="right-part part">
                            <p>{payment.razorpay_order_id}</p>
                            <p>{payment.razorpay_payment_id}</p>
                            <p>{"INR " + payment.transactionFee}</p>
                            <p>{"INR " + payment.transactionTax}</p>
                          </div>
                        </div>
                        <div className="box-conatainer">
                          <div className="button-box">
                            <button
                              className="btn"
                              onClick={handleInvoiceDetails}
                            >
                              Invoice Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
        <ToastContainer />
      </Fragment>
    </>
    // <>
    // <NavBar></NavBar>
    // {loading && <LoadingSpinner></LoadingSpinner>}
    // </>
  );
}
