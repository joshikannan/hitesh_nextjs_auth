// https://www.notion.so/dbConfig-13820a1c077680458597c8e75a8791cc
// this page leads to connect to database
import mongoose from "mongoose";

export async function connectdb(source: string) {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`MongoDB Connected successfully ${source || "unknown"}`);
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection error, please make sure MongoDB is running." + err
      );
      process.exit();
    });
  } catch (err) {
    console.log("Error on db config", err);
    throw new Error("Database connection failed");
  }
}
