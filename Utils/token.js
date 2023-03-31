import jwt from "jsonwebtoken"
import { secretKey } from "./secret.js";

const JWT = process.env.JWT_SECRET

export const createtoken = async(id, email, mobile, password) => {
    const token = await jwt.sign({
        id,
        email,
        mobile,
        password
    }, 
    secretKey)
    // , {expiresIn: process.env.JWT_EXPIRESIN})
    // console.log(process.env.JWT_SECRET);
    return token;
}