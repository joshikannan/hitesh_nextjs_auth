// this page leads to connect to database
import mongoose from "mongoose";

export async function connectdb() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected successfully from");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection error, please make sure MongoDB is running." + err
      );
      process.exit();
    });
  } catch (err) {
    console.log("Error on db config", err);
  }
}
