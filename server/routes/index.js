const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Authenticate } = require("../middleware/authenticate");
require("dotenv").config();
const {
  sendOTPMail,
  customerRegister,
  customerExist,
  getCustomerDetails,
  getAuthToken,
  updateAuthToken,
} = require("../controllers/customer.controller");
const {
  setOtpWithExpiration,
  getOtp,
  randomOtpGenerate,
} = require("../controllers/localStorage.controller");

const {
  getAllRooms,
  getAvailableRooms,
  getRoomDetails,
  getRoomPrice,
} = require("../controllers/rooms.controller");
const {
  bookingProcess,
  getPayableAmount,
  updateBookingAfterPayment,
  getBookingDetails,
} = require("../controllers/booking.controller");
const {
  generateTransactionId,
  insertBookingPayment,
  getPaymentDetails,
} = require("../controllers/payment.controller");
const { default: mongoose } = require("mongoose");
const Room = require("../model/room.model");

// Import the module
const tokenExpir = 86400000; //Expair in one day;
router.use(cookieParser());

router.post("/signin", (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  getCustomerDetails({ email: email })
    .then((result) => {
      if (result == null) {
        res.status(400).json({ valid: false, message: "User Not Found" });
      } else if (password != result.password) {
        res.status(400).json({ valid: false, message: "Invalid Password" });
      } else {
        const token = jwt.sign({ _id: result._id }, process.env.SECREAT_KEY);
        updateAuthToken(result, token);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + tokenExpir),
          httpOnly: true,
        });
        res
          .status(200)
          .json({ valid: true, message: "Login Successfull", token: token });
      }
    })
    .catch((e) => console.log(e));
});

router.post("/userAlreadyExist", (req, res) => {
  console.log(req);
  const userMail = req.body.email;
  customerExist(userMail)
    .then((result) => {
      if (result != null)
        res.status(200).json({ exist: true, message: "User Already Exist" });
      else res.status(200).json({ exist: false });
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

router.get("/getUserData", Authenticate, (req, res) => {
  console.log(req);
  res.send("Reached To Destination");
});

router.post("/getAllRooms", Authenticate, (req, res) => {
  getAllRooms()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/getAvailableRooms", Authenticate, (req, res) => {
  const availabilityConfig = req.body;
  // console.log(availabilityConfig);
  getAvailableRooms(availabilityConfig)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/room/bookingProcess", Authenticate, (req, res) => {
  // console.log(req.userId);
  // console.log(req.body);
  let booking = {
    ...req.body,
    customerId: req.userId,
    roomId: new mongoose.Types.ObjectId(req.body.roomId),
    dateOfBooking: new Date(),
  };
  getRoomPrice(req.body.roomId).then((roomPrice) => {
    booking = {
      ...booking,
      amount: roomPrice * booking.totalDays,
    };
    bookingProcess(booking)
      .then((result) => {
        res.status(200).json({ success: true, ...result });
      })
      .catch((e) => {
        // console.log(e);
        res.status(400).json({ success: false });
      });
    // console.log(booking);
  });
  // console.log(price);

  // console.log(booking);

  // res.status(400).json({success : false})
});

router.post("/roomDetails", Authenticate, (req, res) => {
  const roomId = req.body;
  // console.log(roomId);
  getRoomDetails(roomId)
    .then((result) => {
      // console.log("Result : " + result);
      res.status(200).json({ success: true, ...result._doc });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});

router.post("/room/bookingProcess/payment", Authenticate, (req, res) => {
  // console.log(req.body);
  let payment = {
    bookingId: req.body.bookingId,
    customerId: req.userId,
    currency: "INR",
    paymentMethod: "UPI Payment",
    paymentDate: new Date(),
  };
  getPayableAmount(req.body.bookingId)
    .then((amount) => {
      // Insert Payment GateWay

      const transactionId = generateTransactionId();
      payment = {
        ...payment,
        amount: amount,
        transactionId: transactionId,
      };
      insertBookingPayment(payment)
        .then((paid) => {
          updateBookingAfterPayment(paid)
            .then((result) => {
              if (result.modifiedCount === 0) {
                throw new Error("Not Updated");
              } else {
                res.status(200).json({ success: true });
              }
            })
            .catch((e) => {
              const message = "Fail Update Booking After Payment";
              console.log(message);
              res.status(400).json({ success: false, message: message });
            });
        })
        .catch((e) => {
          const message = "Payment Data Insert Fail";
          console.log(message);
          res.status(400).json({ success: false, message: message });
        });
    })
    .catch((e) => {
      const message = "Get Payable Amount Fail";
      console.log(message);
      res.status(400).json({ success: false, message: message });
    });
});

router.post("/room/bookingProcess/invoice", Authenticate, (req, res) => {
  // console.log(req.body);
  getBookingDetails(req.body.bookingId)
    .then((booking) => {
      getPaymentDetails(booking.paymentId)
        .then((payment) => {
          getRoomDetails(booking.roomId)
            .then((room) => {
              getCustomerDetails({ _id: booking.customerId })
                .then((customer) => {
                  const invoice = {
                    bookingId: booking._id,
                    paymentDate: payment.paymentDate,
                    customerName: customer.firstName + " " + customer.lastName,
                    customerEmail: customer.email,
                    roomName: room.title,
                    customerAdults: booking.adults,
                    customerChildrens: booking.childrens,
                    customerCheckIn: booking.checkInDate,
                    customerCheckOut: booking.checkOutDate,
                    customerTotalDays: booking.totalDays,
                    roomPrice: room.price,
                    bookingAmount: booking.amount,
                    paymentStatus: booking.paymentStatus,
                    paymentMethod: payment.paymentMethod,
                    paymentTransactionId: payment.transactionId,
                  };
                  res.status(200).json({ success: true, message: invoice });
                })
                .catch((e) => {
                  res
                    .status(400)
                    .json({ success: false, message: "Customer Not Found" });
                });
            })
            .catch((e) => {
              res
                .status(400)
                .json({ success: false, message: "Room Not Found" });
            });
        })
        .catch((e) => {
          res
            .status(400)
            .json({ success: false, message: "Payment Not Found" });
        });
      // console.log(result);
      // res.status(200).json({ success: true, message: result });
      // if (reuslt == null) throw new Error("Booking Not Found");
    })
    .catch((e) => {
      res.status(400).json({ success: false, message: "Booking Not Found" });
    });
  // res.send("Done");
});
module.exports = router;
