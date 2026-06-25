import userModel from "../model/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import authRouter from "../routes/auth.routes.js";
import { log } from "console";
import sessionModel from "../model/session.model.js";

export async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    res.status(409).json({
      message: "username or email already exist",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "USer register successfully",
    username: user.username,
    email: user.email,
    accessToken,
  });
}

export async function loginUser(req , res) {

  const {email , password } = req.body;

  const user = await userModel.findOne({email});

  if(!user){
    return res.status(400).json({
      message : "Invalid email or password"
    })
  }
  const isPassword =hashedPassword === user.password;

  if(!isPassword){
    return res.status(401).json({
      message : "Invalid email or password"
    })
  }

  const resfreshtoken = jwt.sign({
    id : user._id
  },
config.JWT_SECRET,
{
  expiresIn :"7d"
}
)

const refreshToken = crypto.createHash('sha256').update(resfreshtoken).digest('hex');

const session = await sessionModel.create({
  user : user._id,
  refreshTokenHash,
  id: req.ip,
  userAgent : req.headers["user- agent"]
})

const accessToken = jwt.sign({
  id : user._id,
  sessionId : session._id,

},
config.JWT_SECRET,
),{
  // expiresIn : "15m"

}
}

export async function getMe(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "token not founded",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "user fetch successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function refreshTokens(req, res) {
  const refreshToken = req.cookies.refreshToken;

  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 27 * 60 * 60 * 100,
  });
  res.status(200).json({
    message: "accessToken refrehed successfully",
    accessToken,
  });
}

export async function logoutUser(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.token(400).json({
      message: "token not found",
    });
  }

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoke: false,
  });

  if (!session) {
    res.status(400).json({
      message: "Invalid resfresh token ",
    });
  }

  session.revoked = true;
  await session.save();
  res.clearCookie("resfreshtoken");

  res.status(200).json({
    message: "successfully logout",
  });
}

export async function logoutAllUser(req ,res ) {
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    return res.status(400)
    .json({
      message : "refresh token not found"
    })
  }
  const decoded = jwt.verify(refreshToken , config.JWT_SECRET)

  await sessionModel.updateMany({
    user:decoded.id,
    revoked : false,
  },{
    revoke : true
  })

  res.clearCookie("refreshToken");
  res.status(200).json({
    message : "loggout from all deviced "
  })
}
