const { default: mongoose } = require("mongoose");
const Payment = require("../model/payment.model");

function generateTransactionId() {
    const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000000); // Generate random number between 0 and 999999
    const transactionId = `${timestamp}${randomNum}`; // Concatenate timestamp and random number
    return transactionId;
}
async function insertBookingPayment(payment)
{
    const inserted = await Payment.create(payment);
    // console.log(inserted);
    return {paymentId : inserted._id, bookingId : payment.bookingId};
}

async function getPaymentDetails(id)
{
    const paymentId = {_id : new mongoose.Types.ObjectId(id)};
    const payment = await Payment.findById(paymentId);
    return payment;

}
module.exports = {generateTransactionId,insertBookingPayment,getPaymentDetails}