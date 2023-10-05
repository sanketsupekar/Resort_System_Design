const Room = require("../model/room.model");

function getAllRooms() {
  const roomData = Room.find();
  return roomData;
}

function getAvailableRooms(availabilityConfig) {
  const query = {
    $and: [
      { adults: { $gte: availabilityConfig.adult } },
      { children: { $gte: availabilityConfig.children } },
    ],
  };

  const availableRooms = Room.find(query);
  return availableRooms;
}
module.exports = { getAllRooms, getAvailableRooms };
