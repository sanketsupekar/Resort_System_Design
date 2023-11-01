import React, { Fragment, useEffect, useState } from "react";
import "../styles/components/payment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";
import { json, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PageNotFound from "./PageNotFound";

import { fetchAPI, fetchGetAPI, isLoggedIn } from "../components/UserFunctions";
const { displaySuccess, displayError } = require("../components/NotifyToast");
const { API_payment, API_getProfileDetails } = require("./../api/index");
const resort_name = "Coconut County Resort";
const resort_img_url =
  "https://github.com/sanketsupekar/Resort_System_Design/assets/72608053/9824ec38-d406-485e-af53-41c7119c7f72";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  // const state = {
  //   bookingId: "653fd8325dfc08ad73ee8987",
  //   amount: 2000,
  // };
  const [loggedIn, setLogin] = useState(isLoggedIn() && state !== null);
  const [buttonVisible, setVisiblility] = useState(true);
  const navigate = useNavigate();
  // const [payment, setPayment] = useState({
  //     bookingId: state.bookingId,
  //     customerId: null,
  //     amount: null, // Amount of money being paid
  //     currency: "INR", // Currency in which the payment is made (e.g., USD, EUR)
  //     paymentMethod: "UPI Payment", // Method used for the payment (e.g., Credit Card, PayPal)
  //     paymentStatus: "Pending", // Status of the payment (e.g., Pending, Completed, Failed)
  //     paymentDate: null, // Date and time when the payment was processed
  //     transactionId: null, // Unique identifier for the payment transaction provided by the payment gateway
  //   });(
  // async function paymentProcess() {
  //   const data = {
  //     bookingId: state.bookingId,
  //   };
  //   setLoading(true);
  //   const respones = await fetchAPI(data, API_payment, "POST");
  //   const json = await respones.json();
  //   // console.log(json.success);
  //   setLoading(false);
  //   if (json.success) {
  //     displaySuccess("Payment Successfull");
  //     navigate("/reserved");
  //   } else {
  //     displayError("Payment Fail");
  //   }
  // }

  async function paymentProcess() {
    // console.log(state);
    setLoading(true);
    const keyRespones = await fetchGetAPI("/api/getPaymentKey");
    const key = await keyRespones.json();
    console.log(key);
    const respones = await fetchAPI(state, "/api/checkout", "post");
    const order = await respones.json();
    console.log(order);
    const options = {
      ...key,
      amount: order.amount,
      currency: "INR",
      name: resort_name,
      description: "Room Booking",
      image: resort_img_url,
      order_id: order.id,
      callback_url: "http://localhost:3001/api/paymentVerification/",
      prefill: {
        ...order.notes,
      },
      notes: {
        address: "Nashik",
      },
      theme: {
        color: "#0062ff",
      },
    };
    // console.log(options);
    // setLoading(false);
    const razor = new window.Razorpay(options);
    razor.open();
  }
  function handlePaymentClick() {
    
  }
  useEffect(() => {
    if (state == undefined) {
      navigate("/pageNotFound");
    }
    setVisiblility(false);
    paymentProcess();
    // console.log(state);
  }, []);
  return (
    <Fragment>
      {loggedIn ? (
        <Fragment>
          <Navbar />
          {loading ? <LoadingSpinner /> : <Fragment />}
          <div className="payment">
            <div className="payment_container">
              {!buttonVisible && <label>Please do not close window, Processing...</label>}
            { buttonVisible && <button
                className="globle_button_design"
                onClick={handlePaymentClick}
              >
                Pay {state.amount}
              </button>}
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      ) : (
        <PageNotFound></PageNotFound>
      )}
    </Fragment>
  );
}
