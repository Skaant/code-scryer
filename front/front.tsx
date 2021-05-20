import React from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { Folder } from "../_motifs/folder/folder";

fetch("http://localhost:9001/folder?path=")
  .then((res) => res.json())
  .then((folder: Folder) =>
    render(<App folder={folder} />, document.getElementById("app"))
  );
