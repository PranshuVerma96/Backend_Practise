require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
   

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

module.exports = connectDB;