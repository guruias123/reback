import express from "express";
// import { getUsers } from "../Models/Controllers/authController.js";
import { forgetPassword, resetPassword, sendMailForVerification, signin, signup, verifyOtp,getUsers, updateUser, getoneuser } from "../Models/Controllers/authController.js";

const route = express();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

route.post('/send-verification-mail', sendMailForVerification)
route.post('/verify-otp', verifyOtp)
route.post('/signup', signup)
route.post('/signin', signin)
route.post('/forget-password', forgetPassword)
route.post('/reset-password', resetPassword)
route.get('/users', getUsers)
route.get('/users/:id', getoneuser)
route.put('/userupdate/:id',updateUser)

export default route;                                                                                                                                                                                                                                        