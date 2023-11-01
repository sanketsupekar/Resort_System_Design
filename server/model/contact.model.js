const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
require("dotenv").config();

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
  message: {
    type: String,
    required: true,
  },
});

const ContactUs = mongoose.model("contactus", ContactSchema);
module.exports = ContactUs;
