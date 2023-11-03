const express = require("express");
const adminRouter = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {getBookingsDateWise, getBookingDetails}  = require("../controllers/booking.controller");
const { getCustomerDetails } = require("../controllers/customer.controller");
const { getRoomDetails } = require("../controllers/rooms.controller");
const { getPaymentDetails } = require("../controllers/payment.controller");
const {getAdminDetails,updateAdminAuthToken} = require("../controllers/administrator.controller");
const tokenExpir = 86400000; //Expair in one day;

adminRouter.post("/getBookings",(req,res)=>{
    getBookingsDateWise(req.body).then((bookings)=>{
        res.status(200).json({bookings});
    }).catch((e)=>{
        res.status(400).json({success:false, message : e});
    })
});
adminRouter.post("/getCustomerDetails",(req,res)=>{
    getCustomerDetails(req.body).then((customer)=>{
        res.status(200).json(customer);
    }).catch((e)=>{
        res.status(400).json(e);
    })
})
adminRouter.post("/getRoomDetails",(req,res)=>{
    // console.log(req.body);
    getRoomDetails(req.body).then((room)=>{
        res.status(200).json(room);
    }).catch((e)=>{
        res.status(400).json(e);
    })
})
adminRouter.post("/getBookingDetails",(req,res)=>{
    // console.log(req.body);
    getBookingDetails(req.body._id).then((booking)=>{
        // console.log(booking);
        res.status(200).json({success:true,...booking});
    }).catch((e)=>{
        console.log(e);
        res.status(200).json({success:false});
    })
   
})
adminRouter.post("/getPaymentDetails",(req,res)=>{
    // console.log(req.body);
    getPaymentDetails(req.body.paymentId).then((payment)=>{
        // console.log(payment);
        res.status(200).json({success:true,...payment});
    }).catch((e)=>{
        console.log(e);
        res.status(200).json({success:false});
    })
   
});
adminRouter.post("/signin", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
  
    getAdminDetails({ email: email })
      .then((result) => {
        if (result == null) {
          res.status(400).json({ valid: false, message: "User Not Found" });
        } else if (password != result.password) {
          res.status(400).json({ valid: false, message: "Invalid Password" });
        } else {
          const token = jwt.sign({ _id: result._id }, process.env.SECREAT_KEY);
          updateAdminAuthToken(result, token);
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + tokenExpir),
            httpOnly: true,
          });
          res
            .status(200)
            .json({ valid: true, message: "Login Successfull", token: token });
          console.log(result)
          res.status(200).send("Done");
        }
      })
      .catch((e) => console.log(e));
  
  });
module.exports = adminRouter;
