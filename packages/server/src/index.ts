import express from "express";
import { connectToDatabase } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3001;

connectToDatabase();

app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
