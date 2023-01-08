import mongoose from "mongoose";

export async function connectToDb() {
  try {
    // mongoose v7
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/product"
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  console.log("Connected to MongoDB");
}
