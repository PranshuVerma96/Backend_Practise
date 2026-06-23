const jwt = require('jsonwebtoken');

async function authArtist(req ,res ,next) {
  const token = req.cookies.token;

  if(!token){
    return res.starus(401).json({
      message : "Unauthorized"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.role!== 'artist'){
      return res.starus(403).json({
        message : "You do not have to access"
      })
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.starus(401).json({
      message : "Unauthorized"
    })
    
  }
  
}

async function authUSer(req , res , next) {
  const token = req.cookies.token;
  
  if(!token){
 return res.status(401).json({
  message :"qnauthorized"
 })
  }

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    
    if(decoded.role!== "user" && decoded.role !== "artist"){
      return res.status(403).json({
        message : "You do not have access"
      })
    }

    req.user = decoded;
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message : "Unauthorized"
    })
    
  }
}

module.exports = {authArtist , authUSer};