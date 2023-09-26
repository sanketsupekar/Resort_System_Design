const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const {sendOTPMail} = require('../controllers/customer.controller');

router.post("/generateOTP", (req,res)=>{
    console.log(req.body);
    const customerEmail = req.body.email;
    const emailSubject = "Email Verification";
    const verificationOTP = 1234;
    sendOTPMail(customerEmail,emailSubject,verificationOTP).then((result) => {
        res.status(200).json(result);
      }).catch((e) => {
        res.status(500).json({ message: "Internet Server Error" });
      })
});
module.exports = router;