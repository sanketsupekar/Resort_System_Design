import React from "react";
import "../styles/components/footer.css";
export default function Footer() {
  return (
    <>
    <div className="footer">
      <footer>
        <div class="footer-content">
          {/* <i class="fa-regular fa-location-pin"></i> */}
          <div className="container">
            <div className="address-box item">
            <h3 className="address"> Address</h3>
            <div className="sub-address">
              <p>Murambi, Wadiwarhe - Ahurli Road, Trimbak </p>
              <p>Nashik, Maharashtra 422403</p>
            </div>
            </div>

            <div className="contact-box item">
            <h3 className="address"> Contact</h3>
            <div className="sub-address">
              <p> <i class="fa-regular fa-envelope"></i>    &nbsp; coconutcounty7681@gmail.com</p>
              <p>8421034511 / 8668207978</p>
            </div>
            </div>
            
            
          </div>
          

          <ul class="socials">
            <li>
              <a className="link" href="#">
                <i class="fa-brands fa-facebook social-item icon"></i>
              </a>
            </li>

            <li>
              <a className="link" href="#">
                <i class="fa-brands fa-instagram social-item icon"></i>
              </a>
            </li>

            <li>
              <a className="link" href="#">
                <i class="fa-solid fa-envelope social-item icon"></i>
              </a>
            </li>

            <li>
              <a className="link" href="#">
                <i class="fa-brands fa-youtube social-item icon"></i>
              </a>
            </li>

            <li>
              <a className="link" href="#">
                <i class="fa-solid fa-phone social-item icon"></i>
              </a>
            </li>
          </ul>
        </div>
{/* 
        <div class="footer-bottom">
          <p className="paragraph">
            Developed By : <span id="year"></span>{" "}
            <a className="title" href="#">
              VIIT Students
            </a>{" "}
          </p>
        </div> */}
      </footer>
      </div>
    </>
  );
}
