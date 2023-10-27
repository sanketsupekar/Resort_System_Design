const { default: mongoose } = require("mongoose");
const Room = require("../model/room.model");
const Booking = require("../model/booking.model");
const { checkout } = require("../routes");
function getAllRooms() {
  const roomData = Room.find();
  return roomData;
}

async function getAvailableRooms(availabilityConfig) {
  // console.log(availabilityConfig);
  const query = {
    $and: [
      { adults: { $gte: availabilityConfig.adults } },
      { childrens: { $gte: availabilityConfig.childrens } },
    ],
  };

  const allRooms = await Room.find(query);
  const target = {
    ...availabilityConfig,
  };

  const bookedRoomQuery = {
    $and: [
      {
        $or: [
          {
            $and: [
              {
                checkInDate: {
                  $lte: target.checkInDate,
                },
              },
              {
                checkOutDate: {
                  $gte: target.checkInDate,
                },
              },
            ],
          },
          {
            $and: [
              {
                checkInDate: {
                  $lte: target.checkOutDate,
                },
              },
              {
                checkOutDate: {
                  $gte: target.checkOutDate,
                },
              },
            ],
          },
          {
            $and: [
              {
                checkInDate: {
                  $gte: target.checkInDate,
                },
              },
              {
                checkOutDate: {
                  $lte: target.checkOutDate,
                },
              },
            ],
          },
        ],
      },
      {
        bookingStatus: {
          $eq: "Confirmed",
        },
      },
    ],
  };
  const bookedRooms = await Booking.find(bookedRoomQuery);
  const availableRooms = allRooms.map((room) => {
    const result = bookedRooms.find(
      (booking) => booking.roomId.toString() === room._id.toString()
    );
    if (result != undefined) {
      room = {
        ...room._doc,
        reserved : true,
        booked: {
          checkInDate: result.checkInDate,
          checkOutDate: result.checkOutDate,
        },
      };
      return room;
    }
    else
    {
      room = {
        ...room._doc,
        reserved : false,
      }
    }
    return room;
  });
  // console.log(availableRooms);
  // console.log("--------------------");
  return availableRooms;
}
function getRoomDetails(roomId) {
  // console.log(roomId);
  const id = { _id: new mongoose.Types.ObjectId(roomId._id) };
  // console.log(id);
  const room = Room.findOne(id);
  // console.log(room);
  return room;
}
async function getRoomPrice(roomId) {
  const id = { _id: new mongoose.Types.ObjectId(roomId) };
  const room = await Room.findById(id);
  return room.price;
}
module.exports = {
  getAllRooms,
  getAvailableRooms,
  getRoomDetails,
  getRoomPrice,
};
