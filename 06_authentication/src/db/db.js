const mongoose = require('mongoose');

async function connectDB(){
  try{
await mongoose.connect(process.env.MONGO_URI)
console.log("Data base connection successfully");

  }
  catch(err){
    console.error("dataBase Connnection error " , err)
  }
}

module.exports = connectDB;