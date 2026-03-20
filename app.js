import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/index.js";
import { connectDB } from "./db/connect.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const { DB_CONNECTION } = process.env;

const app = express();

app.use(express.json());
//remove ../public from index.html
app.use(express.static(path.join(__dirname, "public")));

//Important to connect to DB before router
await connectDB();

app.use("/api", router);

export default app;
