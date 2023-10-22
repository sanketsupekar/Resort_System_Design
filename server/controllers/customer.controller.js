const nodemailer = require('nodemailer');
require('dotenv').config();
const Customer = require('../model/customer.model');

function getOtpformat(verificationOTP)
{
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #4b0000;text-decoration:none;font-weight:600">Coconut County Resort</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing us. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #4b0000;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">`+verificationOTP+`</h2>
    <p style="font-size:0.9em;">Regards,<br />Cocout County Resort</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
     <p>Murambi, </p> 
     <p>Wadiwarhe - Ahurli Road,</p>  
     <p>Trimbak, road, Nashik, </p> 
     <p>Maharashtra 422403</p> 
    </div>
  </div>
</div>`
}
function initializeNodemailer()
{
  const resortEmail = process.env.RESORT_EMAIL;
  const resortEmailPass = process.env.RESORT_EMAIL_PASSWORD;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: resortEmail,
      pass: resortEmailPass
    }
  });
  return transporter;
}
async function sendOTPMail(customerEmail, emailSubject, verificationOTP)
{
      const resortEmail = "Coconut County Resort";
      const transporter = initializeNodemailer();
      const otpHtmlFormat = getOtpformat(verificationOTP);
      const mailOptions = {
        from: resortEmail,
        to: customerEmail,
        subject: emailSubject,
        html : otpHtmlFormat,
      };
      const mailSent =  transporter.sendMail(mailOptions);
      return mailSent;
}
async function customerRegister(data)
{
  const customerData = Customer.insertMany([data]);
  console.log(customerData);
  return customerData;
}
async function customerExist(userMail)
{
//  console.log(userMail);
  const isExist =  await Customer.findOne({email : userMail});
  return isExist;
}

async function getCustomerDetails(customer)
{
  // console.log(userMail);
  const customerData =  await Customer.findOne(customer);
  return customerData;
}

async function getAuthToken(user)
{
  const token = await user.generateAuthToken();
  return token;
}

async function updateAuthToken(user, token)
{
    const updateData = await Customer.updateOne({_id : user._id },{
      $set : {
        tokens : user.tokens.concat({ token: token })
      }
    })
    return updateData;
}
module.exports = {sendOTPMail, customerRegister,customerExist,getCustomerDetails, getAuthToken, updateAuthToken};