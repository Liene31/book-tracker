import app from "./app.js";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});

// This part if for local development since Vercel don't use app.listen
