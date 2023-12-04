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
                  <p>  <a href="mailto:coconutcounty7681@gmail.com?subject=Regarding%20Coconut%20County%20Resort"><i class="fa-regular fa-envelope"></i> </a>   coconutcounty7681@gmail.com</p>
                  <p>8421034511 / 8668207978</p>
                </div>
              </div>


            </div>


            <ul class="socials">

              {/* Ready To Trip */}
              <li>
                <a target="_blank" className="link" href="https://www.readytotrip.com/hotels/India/West%20Zone/Maharashtra/W%C4%81dhiware/coconut-county/">
                  <i className="fa-solid fa-r social-item icon"></i>
                </a>
              </li>
              {/* instagram */}
              <li>
                <a  target="_blank" className="link" href="https://instagram.com/coconut_county_resort?igshid=NzZlODBkYWE4Ng==">
                  <i class="fa-brands fa-instagram social-item icon"></i>
                </a>
              </li>
              {/* palnetofhotels */}
              <li>
                <a target="_blank" className="link" href="https://planetofhotels.com/en/india/wadhiware/coconut-county-resort">
                  <i class="fa-solid fa-globe social-item icon"></i>              </a>
              </li>
              {/* wadhiware */}
              <li>
                <a className="link" href="https://www.lodging-world.com/in/hotels/coconut-county-resort-in-wadhiware-910755684">
                  <i class="fa-solid fa-mountain social-item icon"></i>
                </a>
              </li>
              {/* Google map location */}
              <li>
                <a className="link" href="#">
                  <i class="fa-solid fa-location-dot social-item icon"></i>                </a>
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
