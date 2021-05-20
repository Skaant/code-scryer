import express from "express";
import cors from "cors";
import { resolve as pathResolve } from "path";
import { Folder } from "../_motifs/folder/folder";
const app = express();
const PORT = 9001;

app.use(
  cors({
    allowedHeaders: ["Access-Control-Allow-Origin: http://localhost:3000"],
  })
);

app.get("/folder", async (req, res) => {
  const path = req.query.path?.toString() || "";
  try {
    const folder = new Folder({
      name: "_root",
      path: pathResolve(__dirname, path),
    });
    await folder.provisionContent();
    return res.send(folder);
  } catch (err) {
    return err.message === Folder.ERROR_FOLDER_NOT_FOUND
      ? res.status(401).send(Folder.ERROR_FOLDER_NOT_FOUND)
      : res.status(500).send(err);
  }
});
app.get("/", (req, res) => res.send("zara"));

app.listen(PORT, () => {
  console.log(`code-scryer server running at : https://localhost:${PORT}`);
});
