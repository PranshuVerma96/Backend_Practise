require("dotenv").config();
const mongoose = require('mongoose');


async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to db");
  
  
}
module.exports = connectDB;