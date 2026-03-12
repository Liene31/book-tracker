import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send({ message: "OK, 200" });
});

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
