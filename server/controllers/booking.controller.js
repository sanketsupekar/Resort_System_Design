const Booking = require("../model/booking.model");
const Room = require('../model/room.model');

async function bookingProcess(booking) {
  const filter = {
    $and: [
      {
        $or: [
          {
            $and: [
              { checkInDate: { $lte: booking.checkInDate } },
              { checkOutDate: { $gte: booking.checkInDate } },
            ],
          },
          {
            $and: [
              { checkInDate: { $lte: booking.checkOutDate } },
              { checkOutDate: { $gte: booking.checkOutDate } },
            ],
          },
        ],
      },
      {
        customerId: { $eq: booking.customerId },
      },
      {
        roomId: { $eq: booking.roomId },
      },
    ],
  };
  // console.log(booki);
  const booked = await Booking.findOne(filter)
    .then((result) => {
      if (result != null) {
        // console.log("Found This One");
        return Booking.findOneAndUpdate(
          { _id: result._id },
          { ...booking}
        );
      } else {
        // console.log("Not Found");
        return Booking.create(booking);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return booked;
}

async function getPayableAmount(bookingId)
{
  const amount = await Booking.findById(bookingId).then((booking) =>{
    console.log(booking);
  }).catch((e)=>{
    console.log(e);
  })
}
module.exports = { bookingProcess,getPayableAmount };
