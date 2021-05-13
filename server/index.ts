import express from "express";

const app = express();
const PORT = 9001;

app.get("/", (req, res) => res.send(""));

app.listen(PORT, () => {
  console.log(`code-scryer server running at : https://localhost:${PORT}`);
});
