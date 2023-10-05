import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/PageNotFound.css";
export default function PageNotFound() {
  return (
    <>
      <div className="custom-container">
        <h1 className="custom-heading">
          <span className="number">404</span>
        </h1>
       
        <div className="info text-center">
          <h2>We can't find that page</h2>
          <p>
            We're fairly sure that page used to be here, but seems to have gone
            missing. We do apologize on its behalf.
          </p>
          <Link to="/home" className="text-decoration-none">
            <a className="custom-button">Home</a>
          </Link>
        </div>
      </div>
    </>
  );
}
