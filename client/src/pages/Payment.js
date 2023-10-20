import React, { useEffect,useState } from "react";
import "../styles/components/payment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
const { displaySuccess } = require("../components/NotifyToast");
export default function Payment() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [payment, setPayment] = useState({
        bookingId: null,
        customerId: null,
        amount: null, // Amount of money being paid
        currency: "INR", // Currency in which the payment is made (e.g., USD, EUR)
        paymentMethod: "UPI Payment", // Method used for the payment (e.g., Credit Card, PayPal)
        paymentStatus: "Pending", // Status of the payment (e.g., Pending, Completed, Failed)
        paymentDate: null, // Date and time when the payment was processed
        transactionId: null, // Unique identifier for the payment transaction provided by the payment gateway
      });
  function handlePaymentClick() {
    displaySuccess("Payment Successfull");
  }
async function getPaybleAmount()
{
    
}
  useEffect(()=>{
    if(state == undefined){
        navigate('/pageNotFound');
    }
    // console.log(state);
  },[])
  return (
    <>
      <Navbar />
      <div className="payment">
        <div className="payment_container">
          <button className="globle_button_design" onClick={handlePaymentClick}>
            Pay
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
