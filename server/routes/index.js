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
  updatePassword,
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
  updateTrackingDate,
  getBookedCardDetails,
  setInOutTime,
} = require("../controllers/booking.controller");
const {
  generateTransactionId,
  insertBookingPayment,
  getPaymentDetails,
  checkout,
  paymentVerification,
} = require("../controllers/payment.controller");
const { default: mongoose } = require("mongoose");
const Room = require("../model/room.model");
const { emit } = require("../model/customer.model");

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

router.post("/updatePassword", Authenticate, (req, res) => {
  const id = req.userId;
  const password = req.body.password;
  const confirmPassword = req.body.password;
  if (password == confirmPassword) {
    const data = {
      _id: id,
      password: password,
    };
    updatePassword(data)
      .then((result) => {
        res.status(200).json({ success: true, message: "Password Updated !" });
      })
      .catch((e) => {
        res
          .status(400)
          .json({ success: false, message: "Password Updating Failed !" });
      });
  } else {
    res.status(400).json({ success: false, message: "Forget Password Failed" });
  }
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
  console.log(req.body);
  const customerEmail = req.body.email;
  const emailSubject = "Email Verification";
  const verificationOTP = randomOtpGenerate();
  setOtpWithExpiration(customerEmail, verificationOTP);
  // res
  //   .status(200)
  //   .json({ message: "Email Sent Successfully " + verificationOTP });
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

router.post("/userAndOtpVerification", (req, res) => {
  const email = req.body.userEmail;
  const otp = req.body.userOtp;
  const generatedOtp = getOtp(email);
  console.log(otp + " " + generatedOtp);
  if (otp == generatedOtp) {
    customerExist(email)
      .then((result) => {
        if (result != null) {
          const token = jwt.sign({ _id: result._id }, process.env.SECREAT_KEY);
          updateAuthToken(result, token);
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + tokenExpir),
            httpOnly: true,
          });
          // console.log(result);
          res.status(200).json({ success: true, message: "Email Verified !" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Email Not Registered" });
        }
      })
      .catch((e) => console.log(e));
  } else {
    res.status(400).json({ message: "Email Verification Failed" });
  }
});

router.get("/getProfileDetails", Authenticate, (req, res) => {
  // console.log(req.rootUser);
  const { firstName, lastName, email } = req.rootUser;
  // console.log(firstName +" "+lastName);
  res.status(200).json({ name: firstName + " " + lastName, email: email });
});

router.get("/getAllRooms", (req, res) => {
  // console.log("Reached");
  getAllRooms()
    .then((result) => {
      res.status(200).json({ rooms: result });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/getAvailableRooms", Authenticate, (req, res) => {
  const availabilityConfig = {
    ...req.body,
    ...setInOutTime({
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
    }),
  };
  // console.log(availabilityConfig);

  getAvailableRooms(availabilityConfig)
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/room/bookingProcess", Authenticate, (req, res) => {
  let booking = {
    ...req.body,
    ...setInOutTime({
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
    }),
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
        res.status(400).json({ success: false });
      });
  });
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
      console.log(e);
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
      console.log("Get Paybale Amount");
      const transactionId = generateTransactionId();
      payment = {
        ...payment,
        amount: amount,
        transactionId: transactionId,
      };
      insertBookingPayment(payment)
        .then((paid) => {
          console.log("Insert Booking Payment");
          updateBookingAfterPayment(paid)
            .then((result) => {
              console.log("Update Booking Payment");
              if (result.modifiedCount === 0) {
                throw new Error("Not Updated");
              } else {
                console.log("Enter In Else Part");
                updateTrackingDate({
                  bookingId: paid.bookingId,
                  date: {
                    paymentDate: paid.paymentDate,
                  },
                })
                  .then((date) => {
                    console.log("Update Tracking Date");
                    res.status(200).json({ success: true });
                  })
                  .catch((e) => {
                    res.status(400).json({
                      success: false,
                      message: "Tracking Date Update Fail",
                    });
                  });
              }
            })
            .catch((e) => {
              const message = "Fail Update Booking After Payment";
              console.log(e);
              res.status(400).json({ success: false, message: message });
            });
        })
        .catch((e) => {
          const message = "Payment Data Insert Fail";
          console.log(e);
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

router.post("/room/bookingProcess/trackingDate", Authenticate, (req, res) => {
  updateTrackingDate(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
  // res.send(req.body);
});

router.get("/room/bookedCard", Authenticate, (req, res) => {
  getBookedCardDetails(req.userId)
    .then((bookedCards) => {
      res.status(200).json(bookedCards);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ success: false, message: "BookedCard Not Found" });
    });
});

router.post("/checkout", Authenticate, (req, res) => {
  checkout(req.body, req.rootUser)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
router.get("/getPaymentKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/paymentVerification", (req, res) => {
  console.log(req.body);
  paymentVerification(req.body)
    .then((result) => {
      // res.status(200).json({
      //   success : true,message : "Payment Successfull !"
      // });
      res.redirect("http://localhost:3000/reserved");
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});

module.exports = router;
