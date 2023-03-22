import mongoose from "mongoose";

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    type: {type: String, default: "signup"},
    otp: {type: Number},
    verified: {type: Boolean, default: false}
}, { timestamps: true });

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;