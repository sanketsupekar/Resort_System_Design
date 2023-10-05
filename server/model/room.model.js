const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
require("dotenv").config();

var RoomSchema = new mongoose.Schema({
  url: String,
  title: String,
  titleHeader: String,
  description: String,
  header: String,
  subHeader: String,
  view: String,
  size: String,
  adults: Number,
  children: Number,
  bedding: String,
  amenities: [String],
  paragraph: String,
  subImage: String,
  rooms: Number,
  price: Number,
});

const Room = mongoose.model("rooms", RoomSchema);
module.exports = Room;
