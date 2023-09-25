import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import your home page component
import './global.css';
import LoginForm from "./components/LoginForm";
import GenerateOTP from "./components/GenerateOTP";
import VerifyOTP from "./components/VerifyOTP";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element = {<HomePage/>}></Route>
        {/* {Login_form */}
        <Route path="/login" element = {<LoginForm/>}></Route>
        
        {/* {GenerateOTP} */}
        <Route path="/generateOTP" element = {<GenerateOTP/>}></Route>
        
        {/* {Verify OTP} */}
        <Route path="/verifyOTP" element = {<VerifyOTP/>}></Route>

            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
