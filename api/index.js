import express from "express";
import cors from "cors";
import { router } from "../routes/index.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(express.json());

app.use("/api", router);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
