import mongoose from "mongoose";
import config from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
async function connectDB() {
  try {
    // console.log("MONGO_URI:", config.MONGO_URI);

    await mongoose.connect(config.MONGO_URI);

    console.log("Connected to DB");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  }
}

export default connectDB;