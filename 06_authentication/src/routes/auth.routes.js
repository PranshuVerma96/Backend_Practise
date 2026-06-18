const express = require('express');
const authConroller = require('../controllers/auth.controllers')

const router = express.Router();

router.post("/register" , authConroller.registerUser);
router.get("/test" , (req ,res)=>{
  console.log("cookies" , req.cookies);
  
  res.json({
    message : "test route",
    cookies : req.cookies
  })
})



module.exports = router;