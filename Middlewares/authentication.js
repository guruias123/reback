import jwt from "jsonwebtoken"

import Users from "../Models/userModel.js"
import { secretKey } from "../Utils/secret.js"

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.json({
        success: false,
        msg: "Please login for access this resource",
      })
    }
    // process.env.JWT_SECRET
    const decode = jwt.verify(token, secretKey)
    req.user = await Users.findById(decode.id)
    next()
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: "Authentication Failed" })
  }
}

export default authentication