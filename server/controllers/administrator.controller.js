const nodemailer = require('nodemailer');
require('dotenv').config();
const Customer = require('../model/admin.model');
const Admin = require("../model/admin.model");

async function getAdminDetails(admin)
{
//   console.log(admin);
    const adminData =  await Admin.findOne({email : admin.email});
    // console.log(adminData)
    return adminData;
}

async function updateAdminAuthToken(user, token)
{
    const updateData = await Admin.updateOne({_id : user._id },{
      $set : {
        tokens : user.tokens.concat({ token: token })
      }
    })
    return updateData;
}

module.exports = {getAdminDetails,updateAdminAuthToken};

