import mongoose from "mongoose";

mongoose.set("strictQuery", false);
// mongodb://127.0.0.1:27017/resume
// mongodb+srv://venky:venkateshA1@cluster0.bxnfz.mongodb.net/?retryWrites=true&w=majority
const connectDb = () => { return mongoose.connect('mongodb+srv://venky:venkateshA1@cluster0.bxnfz.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Connected!'))
.catch(err => {console.log('not connected', err);})};

export default connectDb;