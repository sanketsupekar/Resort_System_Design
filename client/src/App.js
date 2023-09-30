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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element = {<SignIn/>}></Route>
        <Route path="/signup" element = {<SignUp/>}></Route>
        <Route path="/signout" element = {<SignOut/>}></Route>
        <Route path="*" element = {<Navigate to='/'/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
