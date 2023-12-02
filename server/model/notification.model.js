const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
require("dotenv").config();

var NotificationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  
  
  status:{
    type: String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING", 
   
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }, 
  
 
});

const Notification = mongoose.model("notification", NotificationSchema);
module.exports = Notification;
