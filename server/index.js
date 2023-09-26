//console.log("Project Runnig");
//qyre btbx oagg tiwj
const express = require("express");
const apiRouter = require("./routes");
const port = process.env.PORT || 3001;
const { connectToDb } = require("./controllers/mongoose.controller");
const path = require("path");
const mongoose = require("mongoose");


const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
connectToDb();
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log("Server is ready to listening....", port);
});


app.use("/test", (req, res) => {
  res.send("Testing...");
});