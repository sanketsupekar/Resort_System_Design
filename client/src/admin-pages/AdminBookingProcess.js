import React, { Fragment, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { displayIcon, fetchAPI, isLoggedIn } from "../components/UserFunctions";
// AmenitiesCard
import { useParams } from "react-router-dom";
import "../styles/admin-styles/adminBookingProcess.css";
import {
  API_ADMIN_getCustomerDetails,
  API_ADMIN_getRoomDetails,
  API_ADMIN_getBookingDetails,
} from "../api";
import NavBar from "../admin-components/NavBar";
import { useEffect } from "react";
import AmenitiesCard from "../components/AmenitiesCard";
// fetchAPI
export default function AdminBookingProcess(props) {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLogin] = useState(isLoggedIn());
  const [room, setRoom] = useState({});
  const [customer, setCustomer] = useState({});
  const [booking, setBooking] = useState({});
  const [dataFetch, setDataFetch] = useState(false);

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

    setLoading(false);
    setBooking(booking._doc);
    setRoom(room);
    setCustomer(customer);
    setDataFetch(true);
    // console.log(booking);
    //  console.log(room);
    //  console.log(customer);
  }
  useEffect(() => {
    getBookingDetails();
    console.log(bookingId);
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Fragment>
        {loggedIn && (
          <Fragment>
            <NavBar></NavBar>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Fragment>
                {/* <Header data={headerData} /> */}
                <div className="admin-booking-process">
                  <div className="room_information">
                    <div className="booking_process_container">
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
                  <div className="booking-information">
                    <div className="booking-information-container">
                      <div className="title-box">
                        <h2>Customer Details</h2>
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
                        <h2>Booking Details</h2>
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
                            <p>{booking.totalDays +" Days"}</p>
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
                        <div className="box-conatainer">
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

                            {/* <p>:</p> */}
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
                            {/* <p></p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking-information">
                    <div className="booking-information-container">
                      <div className="title-box">
                        <h2>Payment Details</h2>
                      </div>
                      <div className="infomation-box">
                        <div className="box-conatainer">
                          <div className="left-part part">
                            <p>Service Type</p>
                            <p>Service Details</p>
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
                            <p>{booking.serviceType}</p>
                            <p>{booking.serviceDetails}</p>
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
                        <div className="box-conatainer">
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

                            {/* <p>:</p> */}
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
                            {/* <p></p> */}
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
      </Fragment>
    </>
    // <>
    // <Navbar></Navbar>
    // {loading && <LoadingSpinner></LoadingSpinner>}
    // </>
  );
}
