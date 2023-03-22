import express from "express";
import { forgetPassword, resetPassword, sendMailForVerification, signin, signup, verifyOtp } from "../Controllers/authController.js";

const route = express();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

route.post('/send-verification-mail', sendMailForVerification)
route.post('/verify-otp', verifyOtp)
route.post('/signup', signup)
route.post('/signin', signin)
route.post('/forget-password', forgetPassword)
route.post('/reset-password', resetPassword)

export default route;                                                                                                                                                                                                                                        