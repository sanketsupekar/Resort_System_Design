const nodemailer = require('nodemailer');
require('dotenv').config();
const Notification = require("../model/notification.model");


// async function addNotification(data) {
//     const notificationData = Notification.insertOne([data]);
//     console.log(notificationData);
//     return notificationData;
//   }
  
  async function addNotification(contactData) {
    const {customerId , status,roomId } = contactData;
      const inserted = await Notification.create(contactData);
      return inserted;
    
         }
         
async function getNotificationRoomDetails(userId) {
   const bookedRoomDetails = await Notification.find({ customerId: userId });
  console.log("notify",bookedRoomDetails);
 return bookedRoomDetails;
}
  
module.exports = {addNotification,getNotificationRoomDetails};

