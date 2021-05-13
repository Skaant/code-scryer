import express from "express";
import { stat } from "fs/promises";
import { resolve as pathResolve } from "path";
import { Folder } from "./_motifs/folder/folder";

const app = express();
const PORT = 9001;

app.get("/folder", async (req, res) => {
  const path = req.query.path?.toString() || "";
  try {
    const folder = new Folder({
      name: "_root",
      path: pathResolve(__dirname, path),
    });
    return res.send({ content: await folder.getContent() });
  } catch (err) {
    return err.message === Folder.ERROR_FOLDER_NOT_FOUND
      ? res.status(401).send(Folder.ERROR_FOLDER_NOT_FOUND)
      : res.status(500).send(err);
  }
});
app.get("/", (req, res) => res.send("a"));

app.listen(PORT, () => {
  console.log(`code-scryer server running at : https://localhost:${PORT}`);
});
