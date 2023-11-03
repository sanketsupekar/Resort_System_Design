import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Switch, Form } from "react-router-dom";
import HomePage from "./customer-pages/HomePage"; // Import your home page component
import './global.css';
import SignIn from "./customer-pages/SignIn";
import RegistrationForm from "./components/RegistrationForm";
import SignUp from "./customer-pages/SignUp";
import {useStateValue} from './Context/StateProvider';
import { Navigate } from "react-router-dom";
import { SignOut } from "./customer-pages/SignOut";
import Booking from "./customer-pages/Booking";
import BookingProcess from "./customer-pages/BookingProcess";
import PageNotFound from './customer-pages/PageNotFound'
import Payment from "./customer-pages/Payment";
import PaymentReceipt from "./customer-pages/PaymentReceipt";
// import Bookings from "./customer-pages/Bookings";
import ForgetPassword from "./customer-pages/ForgetPassword";
import RoomDetails from "./customer-pages/RoomDetails";
import Test from "./customer-pages/Test";
import Profile from "./customer-pages/Profile";
import YourReserved from "./customer-pages/YourReserved";
import Rooms from "./customer-pages/Rooms";
import Dining from "./customer-pages/Dining";
import Enquire from "./customer-pages/Enquire";
// import AdminHome from "./admin-pages/AdminHome";
import AdminBookingProcess from "./admin-pages/AdminBookingProcess";
import AdminBookings from "./admin-pages/AdminBookings";
import AdminHome from "./admin-pages/AdminHome";
import AdminSignIn from "./admin-pages/AdminSignIn";
import AdminEnquire from "./admin-pages/AdminEnquire";
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
        <Route path="/dining" element = {<Dining/>}></Route>
        <Route path="/enquire" element = {<Enquire/>}></Route>
        <Route path="/rooms/:roomId" element = {<RoomDetails/>}></Route>
        <Route path="/booking" element = {<Booking/>}></Route>
        <Route path="/rooms/bookingProcess" element = {<BookingProcess/>}></Route>
        <Route path="/rooms/bookingProcess/payment" element = {<Payment/>}></Route>
        <Route path="/payment" element = {<Payment/>}></Route>
        <Route path="/reserved" element = {<YourReserved/>}></Route>
        <Route path="/reserved/:bookingId" element = {<PaymentReceipt/>}></Route>
        <Route path="/pageNotFound" element = {<PageNotFound/>}></Route>
        <Route path="/forgetPassword" element = {<ForgetPassword/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/test" element={<Test />}></Route>
        {/* <Route path="*" element = {<Navigate to='/'/>} ></Route> */}

        {/* Admin Routes */}

        <Route path="/admin/" element={<AdminHome />}></Route>
        <Route path="/admin/signin" element={<AdminSignIn />}></Route>
        <Route path="/admin/bookings/" element={<AdminBookings />}></Route>
        <Route path="/admin/enquire/" element={<AdminEnquire />}></Route>
        <Route path="/admin/bookings/:bookingId" element={<AdminBookingProcess />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
