import jwt from "jsonwebtoken"
import { secretKey } from "./secret.js";

export const createtoken = async(id, email, mobile, password) => {
    const token = await jwt.sign({
        id,
        email,
        mobile,
        password
    }, secretKey)
    // process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESIN})
    return token;
}