import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/index.js";
import { connectDB } from "./db/connect.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const { DB_CONNECTION } = process.env;

const app = express();

app.use(express.json());
//remove ../public from index.html
app.use(express.static(path.join(__dirname, "public")));

//Important to connect to DB before router
// app.use(async (req, res, next) => {
//   try {
//     await mongoose.connect(DB_CONNECTION, { dbName: "BookTracker" });
//     console.log("connected to Mongo DB");

//     next();
//   } catch (error) {
//     console.log(`Connection failed with error ${error}`);
//     res.status(500).json({ statusCode: 500, message: `${error.message}` });
//   }
// });

//Important to connect to DB before router
await connectDB();

app.use("/api", router);

export default app;
