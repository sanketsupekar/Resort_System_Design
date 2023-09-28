import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import your home page component
import './global.css';
import SignIn from "./components/SignIn";
import RegistrationForm from "./components/RegistrationForm";
import SignUp from "./components/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element = {<HomePage/>}></Route>
        <Route path="/signin" element = {<SignIn/>}></Route>
        <Route path="/signup" element = {<SignUp/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
