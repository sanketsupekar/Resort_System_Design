var mongoose = require("mongoose");
var CustomerSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  phoneNumber : {
    type : Number,
    required : true
  },
  gender :{
    type : String,
    required : true
  },
  password :{
    type : String,
    required : true
  }
});
const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer;