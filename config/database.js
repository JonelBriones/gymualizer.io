import mongoose from "mongoose";
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("MONGODB is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MONGODB is connecting");
  } catch (error) {
    console.log("mongodb error");
    console.log(err);
  }
};
export default connectDB;
