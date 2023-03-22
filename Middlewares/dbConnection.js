import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectDb = () => { return mongoose.connect('mongodb+srv://venky:venkateshA1@cluster0.bxnfz.mongodb.net/resume?retryWrites=true&w=majority').then(() => console.log('Connected!'))};

export default connectDb;