import app from "./src/app.js";
import connectDB from "./src/config/datbase.js";

connectDB();

app.listen(3000,()=>{
    console.log('Server started on port 3000');
    
} )