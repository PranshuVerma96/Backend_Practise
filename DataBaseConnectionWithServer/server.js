const app = require('./src/app');
const connectDb = require('./src/DB/db');

// to connect data base 
connectDb();
app.listen(4000, (req ,res) =>{
  console.log("Server is running on the port 3000");
  
})