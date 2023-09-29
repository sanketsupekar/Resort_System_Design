import React from "react";
import "../styles/components/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <>
    <div className="loading-overlay"></div>
      <div class="horizontal-bar-wrap">
        <div class="bar1 bar"></div>
        {/* <!--   <div class="bar2 bar"></div>
  <div class="bar3 bar"></div>
  <div class="bar4 bar"></div> --> */}
      </div>
    </>
  );
}
