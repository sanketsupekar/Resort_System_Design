const express = require("express");
const adminRouter = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {getBookingsDateWise, getBookingDetails}  = require("../controllers/booking.controller");
const { getCustomerDetails } = require("../controllers/customer.controller");
const { getRoomDetails } = require("../controllers/rooms.controller");

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
        console.log(booking);
        res.status(200).json({success:true,...booking});
    }).catch((e)=>{
        console.log(e);
        res.status(200).json({success:false});
    })
   
})
module.exports = adminRouter;
