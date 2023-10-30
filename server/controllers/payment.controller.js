const { default: mongoose } = require("mongoose");
const Payment = require("../model/payment.model");
const crypto = require("crypto");
const { getPayableAmount } = require("../controllers/booking.controller");
const {updateBookingAfterPayment, updateTrackingDate} = require("../controllers/booking.controller");

// const {instance} = require("../index.js");
const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECREAT_KEY,
});

function generateTransactionId() {
  const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 1000000); // Generate random number between 0 and 999999
  const transactionId = `${timestamp}${randomNum}`; // Concatenate timestamp and random number
  return transactionId;
}
async function insertBookingPayment(payment) {
  const inserted = await Payment.create(payment);
  // console.log(inserted);
  return {
    paymentId: inserted._id,
    paymentDate: payment.paymentDate,
    bookingId: payment.bookingId,
  };
}

async function getPaymentDetails(id) {
  const paymentId = { _id: new mongoose.Types.ObjectId(id) };
  const payment = await Payment.findById(paymentId);
  return payment;
}

async function checkout(data, user) {
  const amount = await getPayableAmount(data.bookingId);
  const options = {
    amount: Number(amount * 100), //amount in the smallest currency unit 1RS = 100paise
    currency: "INR",
    notes: {
      bookingId: data.bookingId,
      customerId: user._id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      contact: user.phoneNumber,
    },
  };
  const order = await instance.orders.create(options);
  return order;
}

async function paymentVerification(data) {
  // res.status(200).send(data);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECREAT_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  console.log(expectedSignature + "/n" + razorpay_signature);
  if (isAuthentic) {
    // Database comes here
    console.log("Correct");
    const payment = await instance.payments.fetch(razorpay_payment_id);
    // console.log(payment);
    const paymentEntry = {
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      razorpay_signature: razorpay_signature,
      bookingId: payment.notes.bookingId,
      customerId: payment.notes.customerId,
      amount: Number(payment.amount / 100),
      currency: payment.currency,
      paymentMethod: payment.method,
      paymentDate: new Date(),
      paymentStatus: payment.status,
      transactionFee: Number(payment.fee /100),
      transactionTax: Number(payment.tax/100),
    };
    const paid = await insertBookingPayment(paymentEntry);
    const updated = await updateBookingAfterPayment(paid);
    const done = await updateTrackingDate({
      bookingId: paid.bookingId,
      date: {
        paymentDate: paid.paymentDate,
      },
    });
    // console.log(inserted);
    // res.redirect(`http://localhost:3000/reserved`);
  } else {
    console.log("Wrong");
    res.status(400).json({
      success: false,
    });
  }
}

module.exports = {
  generateTransactionId,
  insertBookingPayment,
  getPaymentDetails,
  checkout,
  paymentVerification,
};
