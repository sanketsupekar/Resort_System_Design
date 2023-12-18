const express = require("express");
const adminRouter = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {
  getBookingsDateWise,
  getBookingDetails,
  getMonthlyFun,
  getOnlineBookedStatistics,
  updateTrackingDate
} = require("../controllers/booking.controller");
const { getCustomerDetails,getEnquiryDetails,updateReplyToEnquiry,sendEmail } = require("../controllers/customer.controller");
const { getRoomDetails } = require("../controllers/rooms.controller");
const { getPaymentDetails } = require("../controllers/payment.controller");
const {getAdminDetails,updateAdminAuthToken} = require("../controllers/administrator.controller");
const {getEnquiryFormat} = require("../utilities/emailFormat");
const { adminAuthenticate } = require("../middleware/authenticate");
const tokenExpir = 86400000; //Expair in one day;

adminRouter.post("/getBookings", (req, res) => {
  getBookingsDateWise(req.body)
    .then((bookings) => {
      res.status(200).json({ bookings });
    })
    .catch((e) => {
      res.status(400).json({ success: false, message: e });
    });
});
adminRouter.post("/getCustomerDetails", (req, res) => {
  getCustomerDetails(req.body)
    .then((customer) => {
      res.status(200).json(customer);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
adminRouter.post("/getRoomDetails", (req, res) => {
  // console.log(req.body);
  getRoomDetails(req.body)
    .then((room) => {
      res.status(200).json(room);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
adminRouter.post("/getBookingDetails", (req, res) => {
  // console.log(req.body);
  getBookingDetails(req.body._id)
    .then((booking) => {
      // console.log(booking);
      res.status(200).json({ success: true, ...booking });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).json({ success: false });
    });
});

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

adminRouter.get("/getStatistics", (req, res) => {
  getOnlineBookedStatistics(req)
    .then((bookedCards) => {
      // console.log("BookedCards");
      // console.log(bookedCards);
      res.status(200).json(bookedCards);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ success: false, message: "BookedCard Not Found" });
    });
});

adminRouter.get("/getMonthly", (req, res) => {
  console.log(req.body);
  getMonthlyFun(req)
    .then((bookedCards) => {
      // console.log("BookedCards");
      // console.log(bookedCards);
      res.status(200).json(bookedCards);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ success: false, message: "BookedCard Not Found" });
    });
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
          // console.log(result)
          // res.status(200).send("Done");
        }
      })
      .catch((e) => console.log(e));
  
  });

  adminRouter.get("/getEnquiryDetails",(req,res)=>{
    getEnquiryDetails().then((Enquiries)=>{
      res.status(200).json(Enquiries);
    }).catch((e)=>{
      res.status(400).json(e);
    })
  })

  adminRouter.post("/replyToEnquiry",(req,res)=>{
    const customerEmail = req.body.email;
    const emailSubject = "Your Questions Answered";
    const chat = req.body.chat;
    // console.log(chat);
    // var question = "j";

    //get recent msg from customer
    const question = chat.slice().reverse().find(msg => msg.sender === "user")?.text;
    const answer = req.body.answer;
    // res.send([customerEmail,emailSubject,question,answer]);
    const emailFormat = getEnquiryFormat(question,answer);
    updateReplyToEnquiry(req.body).then((replied)=>{
      sendEmail(customerEmail,emailSubject,emailFormat).then((sent)=>{
        res.status(200).json(sent)
      }).catch((e)=>{
        throw e;
      })
    }).catch((e)=>{
      res.status(400).json(e);
    })
  })
  adminRouter.post("/updateTrackingDate",adminAuthenticate,(req,res)=>{

    console.log(req.body);
    updateTrackingDate(req.body).then((result)=>{
      console.log(result);
      res.status(200).json({success : true});
    }).catch((e)=>{
      console.log(e);
      res.status(400).json({success : false});
    })
    // res.status(200).send("Done");
  })
module.exports = adminRouter;
