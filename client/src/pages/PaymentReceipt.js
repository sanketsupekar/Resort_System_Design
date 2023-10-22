import React, { Fragment, useEffect, useState } from "react";
import "../styles/components/paymentReceipt.css";
import { primaryIcon, secondaryIcon } from "../image/index";
import Navbar from "../components/NavBar";
import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { API_getInvoiceDetails } from "../api/index";
import { fetchAPI } from "../components/UserFunctions";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
export default function PaymentReceipt() {
  const {bookingId} = useParams();
  const [loading, setLoading] = useState(false);
  // const invoice = {
  //   bookingId: "6533aa61d69422de8d31b4d8",
  //   paymentDate: new Date("2023-10-21T10:39:38.347Z"),
  //   customerName: "Sanket Supekar",
  //   customerEmail: "sanketsupekar123@gmail.com",
  //   roomName: "Deluxe Bedroom",
  //   customerAdults: 2,
  //   customerChildrens: 1,
  //   customerCheckIn: new Date("2023-10-21T10:37:33.975Z"),
  //   customerCheckOut: new Date("2023-10-23T10:37:33.000Z"),
  //   customerTotalDays: 3,
  //   roomPrice: 2000,
  //   bookingAmount: 6000,
  //   paymentStatus: "Paid",
  //   paymentMethod: "UPI Payment",
  //   paymentTransactionId: "1697884778623880736",
  // };
  const [data, setData] = useState(false);
  const [invoice, setInvoice] = useState({});
  const componentRef = useRef();

  async function getInvoiceDetails(data) {
    setLoading(true);
    const respones = await fetchAPI(data, API_getInvoiceDetails, "POST");
    const json = await respones.json();
    setLoading(false);
    if (json.success) {
      setData(true);
      setInvoice({
        ...json.message,
      });
    } else {
      
    }
    console.log(json);
  }
  useEffect(() => {
    getInvoiceDetails({ bookingId: bookingId });
  }, []);
  return (
    <Fragment>
      <Navbar></Navbar>
      {loading ? <LoadingSpinner /> : <Fragment />}
      {data ? (
        <Fragment>
          {" "}
          <div className="payment_receipt" ref={componentRef}>
            <div className="main_container">
              <div className="header_section">
                <div className="title_box">
                  <h1 className="title_item">Coconut County Resort</h1>
                  <p className="sub_title_item">a piece of heaven…</p>
                </div>
                <div className="logo_box">
                  <img className="primary_logo" src={primaryIcon}></img>
                </div>
              </div>
              <div className="invoice_section">
                <div className="id_date_box">
                  <h5 className="date_item">
                    {new Date(invoice.paymentDate).toDateString()}
                  </h5>
                  <p className="id_item">ID : {invoice.bookingId}</p>
                </div>
                <div className="customer_info_box">
                  <h2 className="name_item">{invoice.customerName}</h2>
                  <p className="email_item">{invoice.customerEmail}</p>
                </div>
                <div className="booking_info_box">
                  <div className="container">
                    <div>
                      <p className="bold_para">Room</p>
                      <p className="bold_para">Adult's</p>
                      <p className="bold_para">Children's</p>
                    </div>
                    <div>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                    </div>
                    <div>
                      <p> {invoice.roomName}</p>
                      <p> {invoice.customerAdults}</p>
                      <p> {invoice.customerChildrens}</p>
                    </div>
                  </div>
                  <div className="container_mid"></div>
                  <div className="container">
                    <div>
                      <p className="bold_para">Check-In</p>
                      <p className="bold_para">Check-Out</p>
                      <p className="bold_para">Total Days</p>
                    </div>
                    <div>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                    </div>
                    <div>
                      <p>{new Date(invoice.customerCheckIn).toDateString()}</p>
                      <p>
                        {new Date(invoice.customerCheckOut).toDateString()}
                      </p>
                      <p> {invoice.customerTotalDays} Days</p>
                    </div>
                  </div>
                </div>

                <div className="payment_info_box">
                  <div className="info_table">
                    <div className="table_column">
                      <h5 className="table_row_title table_row">
                        {" "}
                        Description{" "}
                      </h5>
                      <p className="table_row"> Room Charges </p>
                      <p className="table_row"> Amenities </p>
                      <p className="table_row"> Dining </p>
                      <h3 className="table_row"> Total Amount </h3>
                      {/* Description */}
                    </div>
                    <div className="table_column">
                      <h5 className="table_row_title table_row"> Quantity </h5>
                      <p className="table_row">
                        {" "}
                        {invoice.customerTotalDays} Night{" "}
                      </p>
                      <p className="table_row"> - </p>
                      <p className="table_row"> - </p>
                      <p className="table_row"> </p>
                    </div>
                    <div className="table_column">
                      <h5 className="table_row_title table_row"> Rate </h5>
                      <p className="table_row">
                        {" "}
                        INR {invoice.roomPrice} / Night{" "}
                      </p>
                      <p className="table_row"> - </p>
                      <p className="table_row"> - </p>
                      <p className="table_row"> </p>
                    </div>

                    <div className="table_column">
                      <h5 className="table_row_title table_row"> Amount </h5>
                      <p className="table_row"> INR {invoice.bookingAmount} </p>
                      <p className="table_row"> - </p>
                      <p className="table_row"> - </p>
                      <h3 className="table_row">
                        {" "}
                        INR {invoice.bookingAmount}{" "}
                      </h3>
                    </div>
                  </div>
                  <div className="info_payment">
                    <div className="container">
                      <div>
                        <p className="bold_para">Payment Status</p>
                      </div>
                      <div>
                        <p>:</p>
                      </div>
                      <div>
                        <p> {invoice.paymentStatus}</p>
                      </div>
                    </div>
                    <div className="container_mid"></div>
                    <div className="container">
                      <div>
                        <p className="bold_para">Payment Method</p>
                      </div>
                      <div>
                        <p>:</p>
                      </div>
                      <div>
                        <p>{invoice.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="container_mid"></div>
                    <div className="container">
                      <div>
                        <p className="bold_para">Transaction ID</p>
                      </div>
                      <div>
                        <p>:</p>
                      </div>
                      <div>
                        <p>{invoice.paymentTransactionId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer_section">
                <div className="address_box">
                  <h3 className="title_item">Address</h3>
                  <p className="address_item">Murambi, </p>
                  <p className="address_item">Wadiwarhe - Ahurli Road, </p>
                  <p className="address_item">Trimbak, road, Nashik, </p>
                  <p className="address_item">Maharashtra 422403</p>
                </div>
              </div>
            </div>
          </div>
          <div className="print_button_container">
            <ReactToPrint
              trigger={() => (
                <button className="globle_button_design">
                  {" "}
                  Print / Download{" "}
                </button>
              )}
              content={() => componentRef.current}
            ></ReactToPrint>
          </div>{" "}
        </Fragment>
      ) : (
        <Fragment> </Fragment>
      )}
    </Fragment>
  );
}
