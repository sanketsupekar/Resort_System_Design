const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {
  sendOTPMail,
  customerRegister,
  customerExist,
  getCustomerData
} = require("../controllers/customer.controller");
const {
  setOtpWithExpiration,
  getOtp,
  randomOtpGenerate,
} = require("../controllers/localStorage.controller");
// Import the module

router.post("/signin", (req, res) => {
 // console.log(req.body);
 const email = req.body.email;
 const password = req.body.password;
 getCustomerData(email).then((result)=>{
    if(result == null) res.status(400).json({valid : false, message : "User Not Found"});
    else if(password != result.password) res.status(400).json({valid : false, message : "Invalid Password"});
    else res.status(200).json({ valid: true, message : "Login Successfull" });
 }).catch((e)=> console.log(e));
});

router.post("/userAlreadyExist", (req, res) => {
  console.log(req);
  const userMail = req.body.email;
  customerExist(userMail)
    .then((result) => {
      if (result != null) res.status(200).json({ exist: true, message : "User Already Exist" });
      else res.status(200).json({ exist: false});
    })
    .catch((e) => console.log(e));
});
router.post("/generateOTP", (req, res) => {
  //console.log(req.body);
  const customerEmail = req.body.email;
  const emailSubject = "Email Verification";
  const verificationOTP = randomOtpGenerate();
  setOtpWithExpiration(customerEmail, verificationOTP);
  sendOTPMail(customerEmail, emailSubject, verificationOTP)
    .then((result) => {
      res.status(200).json({ message: "Email Sent Successfully" });
    })
    .catch((e) => {
      res.status(500).json({ message: "Internet Server Error" });
    });
});

router.post("/verificationOTP", (req, res) => {
  const email = req.body.userEmail;
  const otp = req.body.userOtp;
  const generatedOtp = getOtp(email);
  console.log(otp + " " + generatedOtp);
  if (otp == generatedOtp) {
    customerRegister(req.body.userData)
      .then((result) => {
        res.status(200).json({ message: "Email Verified Successfully" });
      })
      .catch((e) => console.log(e));
  } else {
    res.status(400).json({ message: "Email Verification Failed" });
  }
});
module.exports = router;
