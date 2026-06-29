const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


/**
* - user register controller 
* - Post /api/auth/register

*/
async function  userRegisterController(req ,res){
  const {email, password, name} = req.body;

  // check user alreadyRegister

  const isExists = await userModel.findOne({
    email : email
  })
  if(isExists){
    return res.status(422).json({
      message : "user already exists with email",
      status : "failed",
    })
  }

  // create new account 

  const user = await userModel.create({
    email , password , name 
  })

  const token = jwt.sign({ userId : user._id, },process.env.JWT_SECRET ,{expiresIn : "3d"});

  res.cookie("token" , token)

  res.status(201)
  .json({
    user:{
      _id:user._id,
      email : user.email,
      name : user.name
    },
    token
    
  })
}

module.exports = {
  userRegisterController
}