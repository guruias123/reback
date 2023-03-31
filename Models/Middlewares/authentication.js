import jwt from "jsonwebtoken"
import {secretKey}  from "../Utils/secret.js"

import Users from "../Models/userModel.js"
const JWT = process.env.JWT_SECRET
const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if (!token) {
      return res.json({
        success: false,
        msg: "Please login for access this resource",
      })
    }
    // process.env.JWT_SECRET
    const decode = jwt.verify(token, secretKey)
    console.log(decode);
    req.user = await Users.findById(decode.id)
    next()
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: "Authentication Failed" })
  }
}

export default authentication