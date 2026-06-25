import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

/*
@route Post /api/auth/ register
*/

authRouter.post("/register",authController.registerUser)

authRouter.post('/login' , authController.loginUser);

/* GET /api/auth/get-me*/

authRouter.get("/get-me",authController.getMe);


authRouter.get('verify-email' , authController.verifyEmail)
// get api/auth/refresh token

authRouter.get("/refresh-token",authController.refreshTokens);

authRouter.get("/logout" , authController.logoutUser);

authRouter.get('/logoutAll' , authController.logoutAllUser);

export default authRouter;
