import React, { Fragment, useEffect, useState } from "react";
import "../styles/components/payment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";
import { json, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PageNotFound from "./PageNotFound";

import { fetchAPI, isLoggedIn } from "../components/UserFunctions";
const { displaySuccess, displayError } = require("../components/NotifyToast");
const { API_payment } = require("./../api/index");
export default function Payment() {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [loggedIn, setLogin] = useState(isLoggedIn() && state !== null);
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
  async function paymentProcess() {
    const data = {
      bookingId: state.bookingId,
    };
    setLoading(true);
    const respones = await fetchAPI(data, API_payment, "POST");
    const json = await respones.json();
    // console.log(json.success);
    setLoading(false);
    if (json.success) {
      displaySuccess("Payment Successfull");
      navigate("/reserved");
    } else {
      displayError("Payment Fail");
    }
  }
  function handlePaymentClick() {
    paymentProcess();
  }
  useEffect(() => {
    if (state == undefined) {
      navigate("/pageNotFound");
    }
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
              {/* <label>Amount : {state.amount}</label> */}
              <button
                className="globle_button_design"
                onClick={handlePaymentClick}
              >
                Pay {state.amount}
              </button>
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
