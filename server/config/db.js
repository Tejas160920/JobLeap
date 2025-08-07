const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });
    console.log(`MongoDB connected ✅ Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
