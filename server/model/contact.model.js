const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
require("dotenv").config();
var Message = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

});

var ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  chat: [Message],
  date: {
    type: Date,
    required: true,
  },
  status:{
    type: String,
    enum: ["New Enquiry", "Enquiry Resolved"],
    default: "New Enquiry",
  }
});

const ContactUs = mongoose.model("contactus", ContactSchema);
module.exports = ContactUs;
