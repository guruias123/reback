import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    type: {type: String, default: "user"},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: String},
    email: {type: String, required: true},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

