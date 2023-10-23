import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Switch, Form } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import your home page component
import './global.css';
import SignIn from "./pages/SignIn";
import RegistrationForm from "./components/RegistrationForm";
import SignUp from "./pages/SignUp";
import {useStateValue} from './Context/StateProvider';
import { Navigate } from "react-router-dom";
import { SignOut } from "./pages/SignOut";
import Rooms from "./pages/Rooms";
import BookingProcess from "./pages/BookingProcess";
import PageNotFound from './pages/PageNotFound'
import Payment from "./pages/Payment";
import PaymentReceipt from "./pages/PaymentReceipt";
import Bookings from "./pages/Bookings";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element = {<SignIn/>}></Route>
        <Route path="/signup" element = {<SignUp/>}></Route>
        <Route path="/signout" element = {<SignOut/>}></Route>
        <Route path="/rooms" element = {<Rooms/>}></Route>
        <Route path="/rooms/bookingProcess" element = {<BookingProcess/>}></Route>
        <Route path="/rooms/bookingProcess/payment" element = {<Payment/>}></Route>
        <Route path="/rooms/bookings" element = {<Bookings/>}></Route>
        <Route path="/rooms/bookings/:bookingId" element = {<PaymentReceipt/>}></Route>
        <Route path="/pageNotFound" element = {<PageNotFound/>}></Route>
        {/* <Route path="*" element = {<Navigate to='/'/>} ></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
