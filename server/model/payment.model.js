const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookingId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    unique : true,
  },
  amount :{
    type:Number,
    required:true,
  },
  currency :{
    type:String,
    enum : ["INR","USD"],
    default : "INR",

  },
  paymentMethod :{
    type : String,
    enum : ["UPI Payment", "Card Payment","Cash"],
    default : "UPI Payment"
  },
  paymentDate:{
    type : Date,
    required : true,
  },
  transactionId : {
    type : String, 
    required : true,
    unique : true,
  }
});

const Payment  = mongoose.model('payment',PaymentSchema);
module.exports = Payment;