import express from "express";
import cors from "cors";
import { resolve as pathResolve } from "path";
import { ServerFolder } from "./_motifs/folder/ServerFolder";
import { ServerState } from "./_motifs/state/ServerState";
import { ServerFile } from "./_motifs/file/ServerFile";

const app = express();
const PORT = 9001;

ServerState.set({
  options: {
    projectPath: pathResolve(__dirname, ".."),
  },
});

app.use(
  cors({
    allowedHeaders: ["Access-Control-Allow-Origin: http://localhost:3000"],
  })
);

app.get("/folder", async (req, res) => {
  const path = req.query.path?.toString() || "";
  const splitPath = path.split("/");
  const name = splitPath.pop() || "";
  try {
    const folder = new ServerFolder({
      name,
      /** `splitPath` has one less due to `.pop()`. */
      path: splitPath.join("/"),
    });
    return res.send(await folder.toNetwork());
  } catch (err) {
    return err.message === ServerFolder.ERROR_FOLDER_NOT_FOUND
      ? res.status(401).send(ServerFolder.ERROR_FOLDER_NOT_FOUND)
      : res.status(500).send(err);
  }
});

app.get("/file", async (req, res) => {
  const path = req.query.path?.toString() || "";
  const splitPath = path.split("/");
  const name = splitPath.pop() || "";
  try {
    const file = new ServerFile({
      name,
      /** `splitPath` has one less due to `.pop()`. */
      path: splitPath.join("/"),
    });
    return res.send(await file.toNetwork());
  } catch (err) {
    return err.message === ServerFolder.ERROR_FOLDER_NOT_FOUND
      ? res.status(401).send(ServerFolder.ERROR_FOLDER_NOT_FOUND)
      : res.status(500).send(err);
  }
});

app.get("/", (req, res) =>
  res.send(
    "<html><body><div id='app'></div><script src='/front.js'></script></body></html>"
  )
);
app.get("/front.js", (req, res) =>
  res.sendFile(pathResolve(__dirname, "../front/front.js"))
);

app.listen(PORT, () => {
  console.log(`code-scryer server running at : https://localhost:${PORT}`);
});
