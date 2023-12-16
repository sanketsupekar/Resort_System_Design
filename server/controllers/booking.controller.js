const { default: mongoose, mongo } = require("mongoose");
const Booking = require("../model/booking.model");
const Room = require("../model/room.model");
const { findOne } = require("../model/customer.model");
const { getRoomDetails } = require("./rooms.controller");

const dayStartWith = 9;
const dayEndWith = 8;
function setInOutTime(date,dayStartWith,dayEndWith) {
  return {
    checkInDate: new Date(new Date(date.checkInDate).setHours(dayStartWith, 0, 0, 0)),
    checkOutDate: new Date(new Date(date.checkOutDate).setHours(dayEndWith, 0, 0, 0)),
  };
}
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
  if(data.date.completedDate){
    await Booking.updateOne(
      { _id: data.bookingId },{
        bookingStatus:"Completed"
      }
    )
  }
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
      roomName: room.title,
      roomHeader: room.titleHeader,
      roomImage: room.mainImage,
      bookingAmount: booking.amount,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      trackingDate:
        booking.trackingDate == undefined ? null : booking.trackingDate._doc,
      bookingId: booking._id,
    };
    bookedCards.push(bookedCard);
  });

  return bookedCards;
}

async function getBookingsDateWise(date)
{
  target = setInOutTime(date,dayStartWith,dayEndWith);
  // console.log(new Date(target.checkInDate).toDateString());
  // console.log(new Date(target.checkOutDate).toDateString());
  const bookedRoomQuery = {
    $and: [
      {
        $or: [
          {
            $and: [
              {
                checkInDate: {
                  $gte: target.checkInDate,
                },
              },
              {
                checkInDate: {
                  $lte: target.checkOutDate,
                },
              },
            ],
          },
          {
            $and: [
              {
                checkOutDate: {
                  $gte: target.checkInDate,
                },
              },
              {
                checkInDate: {
                  $lte: target.checkOutDate,
                },
              },
            ],
          },
          // {
          //   $and: [
          //     {
          //       checkInDate: {
          //         $lte: target.checkOutDate,
          //       },
          //     },
          //     {
          //       checkOutDate: {
          //         $gte: target.checkOutDate,
          //       },
          //     },
          //   ],
          // },
          // {
          //   $and: [
          //     {
          //       checkInDate: {
          //         $gte: target.checkInDate,
          //       },
          //     },
          //     {
          //       checkOutDate: {
          //         $lte: target.checkOutDate,
          //       },
          //     },
          //   ],
          // },
        ],
      },
      {
        bookingStatus: {
          $eq: "Confirmed",
        },
      },
    ],
  };
  const bookings = await Booking.find(bookedRoomQuery);
  return bookings;
}
async function getOnlineBookedStatistics(req) {
  const bookings = await Booking.find();
  const rooms = await Room.find();
  
  // Create a map to store the sum of booking amounts for each room
  const roomBookingSums = new Map();

  bookings.forEach((booking) => {
    const room = rooms.find((item) => booking.roomId.toString() === item._id.toString());

    if (room) {
      const roomId = room._id.toString();
      const bookingAmount = booking.amount;

      // If the room is already in the map, add the booking amount to the sum
      if (roomBookingSums.has(roomId)) {
        roomBookingSums.set(roomId, roomBookingSums.get(roomId) + bookingAmount);
      } else {
        // If the room is not in the map, initialize the sum with the booking amount
        roomBookingSums.set(roomId, bookingAmount);
      }
    }
  });

  // Convert the map to an array of objects
  const bookedRooms = Array.from(roomBookingSums, ([roomId, totalAmount]) => ({
    roomName: rooms.find((item) => item._id.toString() === roomId).title,
    totalBookingAmount: totalAmount,
  }));

  return bookedRooms;
}


async function getMonthlyFun(req) {
  const bookings = await Booking.find();

  const bookingCountsByMonth = {};

  bookings.forEach((booking) => {
    const checkInDate = booking.checkInDate;
    const monthKey = `${checkInDate.getFullYear()}-${checkInDate.getMonth() + 1}`; // Month is zero-based, so add 1

    if (!bookingCountsByMonth[monthKey]) {
      bookingCountsByMonth[monthKey] = 0;
    }

    bookingCountsByMonth[monthKey]++;
  });

  const result = Object.entries(bookingCountsByMonth).map(([monthKey, count]) => {
    const [year, month] = monthKey.split('-');
    return {
      month: parseInt(month),
      count,
    };
  });

  return result;
}
module.exports = {
  bookingProcess,
  getPayableAmount,
  updateBookingAfterPayment,
  getBookingDetails,
  updateTrackingDate,
  getBookedCardDetails,
  setInOutTime,
  getBookingsDateWise,
  getMonthlyFun,
  getOnlineBookedStatistics,
};
