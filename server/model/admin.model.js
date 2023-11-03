const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
require("dotenv").config();

var AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;
