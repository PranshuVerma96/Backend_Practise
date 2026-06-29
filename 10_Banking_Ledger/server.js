require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const dns = require('dns');

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// call function to connect the data base 
connectDB();

app.listen(process.env.PORT || 4000 , ()=>{
  console.log('Server is running on port 3000');
  
})