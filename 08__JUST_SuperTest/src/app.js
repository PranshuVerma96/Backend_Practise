const express = require('express');
const validationRules = require('./middleware/validation.middleware');

const app = express();

app.use(express.json());


app.get('/',(req , res) =>{
  res.status(200).json({
    message : "Hello world "
  })
})

app.post("/register" ,validationRules, (req ,res) => {
  const {username , email , password} = req.body;

  res.status(201).json(
    {
      message : "User register Successfully" , 
      user : {
        username , email ,password
      }
    }
  )

})
module.exports = app;
