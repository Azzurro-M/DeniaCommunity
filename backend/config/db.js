const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });

const db = process.env.MONGO_DB_LINK;
mongoose.set("strictQuery", true);
console.log(db);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(db);
    console.log(`MongoDB Connected: ${connection.connection.host}`.cyan);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
