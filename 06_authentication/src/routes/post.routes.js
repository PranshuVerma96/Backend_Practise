const express = require("express");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/create",(req ,res)=>{
  const token = req.cookies.token;
  if(!token){
    res.status(401).json({
      message : "unauthorised"
    })
  }

  try{
 const decoded =  jwt.verify(token,process.env.JWT_SECRET);
 console.log(decoded)
  }
  catch(err){
    return res.status(401).json({
      message : "Unauthorized and token is unvalid"
    })
  }
})

module.exports = router;