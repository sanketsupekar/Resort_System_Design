const { default: mongoose } = require("mongoose");
const Room = require("../model/room.model");

function getAllRooms() {
  const roomData = Room.find();
  return roomData;
}

function getAvailableRooms(availabilityConfig) {
  const query = {
    $and: [
      { adults: { $gte: availabilityConfig.adults } },
      { childrens: { $gte: availabilityConfig.childrens } },
    ],
  };

  const availableRooms = Room.find(query);
  return availableRooms;
}
function getRoomDetails(roomId)
{
  // console.log(roomId);
  const id = {_id : new mongoose.Types.ObjectId(roomId._id)};
  // console.log(id);
  const room = Room.findOne(id);
  return room;
}
async function getRoomPrice(roomId)
{
  const id = {_id : new mongoose.Types.ObjectId(roomId)};
  const room = await Room.findById(id);
  return room.price;
}
module.exports = { getAllRooms, getAvailableRooms,getRoomDetails,getRoomPrice};
