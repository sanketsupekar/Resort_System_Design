import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import your home page component
import './global.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element = {<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
