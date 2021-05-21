import * as React from "react";
import { Folder } from "../../_motifs/folder/folder";
import { Explorer } from "./Explorer";

export function App() {
  const [folderPath, setFolderPath] = React.useState("");
  const [folder, setFolder] = React.useState<Folder>();
  React.useEffect(() => {
    fetch("http://localhost:9001/folder?path=" + folderPath)
      .then((res) => res.json())
      .then((folder: Folder) => setFolder(folder));
  }, [folderPath]);
  return (
    <div>
      <h1>Welcome aboard the Code Scryer !</h1>
      <Explorer folder={folder} setFolderPath={setFolderPath} />
    </div>
  );
}
