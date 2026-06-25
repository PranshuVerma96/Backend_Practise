import mongoose from "mongoose";
import { refreshTokens } from "../controllers/auth.controller";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
    },
    refreshTokenHash: {
      type: String,
      required: [true, "Refresh token hash is required"],
    },
    ip: {
      type: String,
      required: [true, "Ip address is required"],
    },
    userAget: {
      type: String,
      requird: [true, "useragnt is required"],
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const sessionModel = mongoose.Model("sessions" , sessionSchema);
export default sessionModel;