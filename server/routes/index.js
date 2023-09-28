const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const {sendOTPMail} = require('../controllers/customer.controller');
const {setOtpWithExpiration, getOtp, randomOtpGenerate} = require('../controllers/localStorage.controller');
// Import the module

router.post("/generateOTP", (req,res)=>{
    //console.log(req.body);
    const customerEmail = req.body.email;
    const emailSubject = "Email Verification";
    const verificationOTP = randomOtpGenerate();
    setOtpWithExpiration(customerEmail,verificationOTP);
    sendOTPMail(customerEmail,emailSubject,verificationOTP).then((result) => {
        res.status(200).json({message : 'Email Sent Successfully'});
      }).catch((e) => {
        res.status(500).json({message: "Internet Server Error" });
      })
});

router.post("/verificationOTP", (req,res)=>{

   const email = req.body.userEmail;
   const otp = req.body.userOtp;
   const generatedOtp = getOtp(email);
   console.log(otp +" "+generatedOtp);
   if(otp == generatedOtp)
   {
    res.status(200).json({message:'Otp Verified Successfully'});
   }
   else
   {
    res.status(400).json({message:'Otp Verification Failed'});
   }
});
module.exports = router;