const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ["INR", "USD"],
    default: "INR",
  },
  paymentMethod: {
    type: String,
    required: true,
    // enum : ["UPI Payment", "Card Payment","Cash"],
    // default : "UPI Payment"
  },

  paymentDate: {
    type: Date,
    required: true,
  },
  paymentStatus: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
    unique: true,
  },
  transactionFee: {
    type: String,
    required: true,
  },
  transactionTax: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("payment", PaymentSchema);
module.exports = Payment;
