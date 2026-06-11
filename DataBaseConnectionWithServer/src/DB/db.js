const mongoose = require('mongoose');

async function connctDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/App")

  console.log("Connected to Db");
  
  
}

module.exports = connctDb;