import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "myapp", // 👈 choose a db name instead of default
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB error:", err);
  });
}
