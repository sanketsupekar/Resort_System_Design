//console.log("Project Runnig");
//qyre btbx oagg tiwj
const express = require("express");
const apiRouter = require("./routes/index");
const Razorpay = require("razorpay");
require("dotenv").config();
const port = process.env.PORT || 3001;
const { connectToDb } = require("./controllers/mongoose.controller");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
connectToDb();
app.use("/api", apiRouter);
// app.use(express.static(path.resolve(__dirname, "../client/build/")));
// app.use("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

app.listen(port, () => {
  console.log("Server is ready to listening....", port);
  // console.log( instance);
});

async function getPayment() {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECREAT_KEY,
  });
  const payment = await instance.payments.fetch("pay_MuUZEkdKX2obvo");
  console.log(payment);
}
app.use("/test", (req, res) => {
  getPayment().then((r)=>{
    // console.log();
  }).catch((e)=>{
    console.log(e);
  })
  res.send("Testing...");
});

// module.exports = {instance};
