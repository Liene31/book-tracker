import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const app = express();
const __dirname = path.dirname(__filename);
const PORT = 3000;

//remove ../public from index.html
// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});

// in SERVER
// app.get("/") -> serve frontend

// in ROUTER
// /api/books -> CRUD
// /api/auth
// /api/users

//for searching and filtering currently will leave in front
//if time, can implement it backend
//my DB currently is small, fetching all data and them filtering is okay
//later when DB becomes bigger, more efficient is to serve only what's requested
