const { default: mongoose, mongo } = require("mongoose");
const Booking = require("../model/booking.model");
const Room = require("../model/room.model");
const { findOne } = require("../model/customer.model");
const { getRoomDetails } = require("./rooms.controller");
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
        paymentStatus: { $eq: "Pending" },
      },
      {
        bookingStatus: { $eq: "Pending" },
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
        return Booking.findOneAndUpdate({ _id: result._id }, { ...booking });
      } else {
        // console.log("Not Found");
        // console.log(booking);
        return Booking.create(booking);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return booked;
}

async function getPayableAmount(bookingId) {
  const id = { _id: new mongoose.Types.ObjectId(bookingId) };
  // console.log(id);
  const booking = await Booking.findById(id);
  // console.log(booking.amount);
  return booking.amount;
}
async function updateBookingAfterPayment(paid) {
  // console.log(paid);
  const paymentId = paid.paymentId;
  const bookingId = new mongoose.Types.ObjectId(paid.bookingId);
  const updated = await Booking.updateOne(
    { _id: bookingId },
    { paymentId: paymentId, paymentStatus: "Paid", bookingStatus: "Confirmed" }
  );
  return updated;
}

async function getBookingDetails(bookingId) {
  bookingId = { _id: new mongoose.Types.ObjectId(bookingId) };
  const booking = await Booking.findById(bookingId);
  return booking;
}

async function updateTrackingDate(data) {
  const booking = await Booking.findOne({ _id: data.bookingId });
  // console.log(data);
  // console.log(booking.trackingDate);
  const updated = await Booking.updateOne(
    { _id: data.bookingId },
    booking.trackingDate === undefined
      ? { trackingDate: { ...data.date } }
      : { trackingDate: { ...booking.trackingDate._doc, ...data.date } }
  );
  // console.log(updated);
  return updated;
}

async function getBookedCardDetails(userId) {
  const bookings = await Booking.find({ customerId: userId });
  const rooms = await Room.find();
  // console.log(rooms);
  var bookedCards = [];
  bookings.map((booking) => {
    const room = rooms.filter((item) => {
      return booking.roomId.toString() === item._id.toString();
    })[0];

    const bookedCard = {
      roomName : room.title,
      roomHeader : room.titleHeader,
      roomImage : room.mainImage,
      bookingAmount : booking.amount,
      checkInDate : booking.checkInDate,
      checkOutDate : booking.checkOutDate,
      trackingDate :  booking.trackingDate == undefined ? null : booking.trackingDate._doc,
      bookingId : booking._id,
    }
    bookedCards.push(bookedCard);
  });

  return bookedCards;
}
module.exports = {
  bookingProcess,
  getPayableAmount,
  updateBookingAfterPayment,
  getBookingDetails,
  updateTrackingDate,
  getBookedCardDetails,
};
