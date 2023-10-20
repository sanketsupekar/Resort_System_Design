const { default: mongoose } = require("mongoose");
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
        console.log(booking);
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
  const id = {_id : new mongoose.Types.ObjectId(bookingId)};
  // console.log(id);
  const booking = await Booking.findById(id);
  // console.log(booking.amount);
  return booking.amount;
}
async function updateBookingAfterPayment(paid){
  // console.log(paid);
  const paymentId = paid.paymentId;
  const bookingId = new mongoose.Types.ObjectId(paid.bookingId);
  const updated = await Booking.updateOne({_id : bookingId}, {paymentId : paymentId, paymentStatus : "Paid", bookingStatus : "Confirmed"});
  return updated;

}
module.exports = { bookingProcess,getPayableAmount,updateBookingAfterPayment};
