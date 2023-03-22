import OTP from "../Models/otp.js";
import User from "../Models/userModel.js";
import { bcryptPassword, comparePassword } from "../Utils/bcrypt.js";
import sendMail from "../Utils/mail.js";
import { createtoken } from "../Utils/token.js";

export const sendMailForVerification = async(req, res) => {
    const {email, type} = req.body;
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        await sendMail(otp, email)
        // console.log({otp})
        const oneTimePassword = new OTP({
            otp,
            type
        })
        await oneTimePassword.save();
        return res.json({success: true, msg: "OTP Sent Successfully"})
    } catch (error) {
        console.log({error});
        res.json({success: false, msg: "something went wrong", err: error})
    }
}

export const verifyOtp = async(req, res) => {
    const {verifyType, otp, email} = req.body;
    try {
        console.log(verifyType, otp, email)
        const findOtp = await OTP.findOne({otp});
        if(!findOtp) return res.json({success: false, msg: "Incorrect OTP"})
        if(findOtp.verified) return res.json({success: false, msg:"OTP Already Used"})
        const id = findOtp._id;
        await OTP.findByIdAndUpdate({_id: id}, {verified: true})
        if(verifyType == "login") {
            const user = await User.findOne({email});
            console.log({user});
            if(!user) return res.json({success: false, msg: "Account not exist please signin"})
            const {_id, mobile} = user;
            const token = await createtoken(_id, email, mobile);
            return res.json({success: true, msg: "Login Success", token })
        }
        if(verifyType == "register") {
            return res.json({success: true, msg: "OTP Verified Successfully" });
        } 
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "something went wrong", err: error})
    }
}

export const signup = async (req, res) => {
    try {
        console.log(req.body);
        let {firstName, lastName, email, mobile, age} = req.body;
        const userFind = await User.findOne({email});
        console.log({userFind});
        if(userFind) {
            return res.json({success: false, msg: "Account Already Exist"})
        }
        const user = new User({ firstName, lastName, email, mobile, age});
        await user.save();
        const token = await createtoken(user._id, email, mobile);
        console.log({token});
        return res.json({success: true, msg: "Account created successfully", token});
    } catch (error) {
        console.log({error});
        res.json({success: false, msg: "something wnt wrong", err: error})
    }
}

export const signin = async (req, res) => {
    const {email} = req.body;
    try {
        const userFind = await User.findOne({email});
        if(!userFind) {
            return res.json({success: false, msg: "Account not exist create an account"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        await sendMail(otp, email)
        const oneTimePassword = new OTP({
            otp,
        })
        await oneTimePassword.save();
        return res.json({success: true, msg: "OTP Sent Successfully"});
    } catch (error) {
        console.log({error})
        res.json({success: false, msg: "something wnt wrong", err: error})
    }
}

export const forgetPassword = async (req, res) => {}
export const resetPassword = async (req, res) => {}