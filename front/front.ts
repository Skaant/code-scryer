import { Folder } from "../_motifs/folder/folder";

fetch("http://localhost:9001/folder?path=")
  .then((res) => res.json())
  .then((res) => document.body.append(JSON.stringify(res)));
