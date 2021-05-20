import * as React from "react";
import { Folder } from "../../_motifs/folder/folder";

export function App({ folder }: { folder: Folder }) {
  return (
    <div>
      <h1>Salut !</h1>
      {folder.content?.map(({ name, path }) => (
        <div key={path}>{name}</div>
      ))}
    </div>
  );
}
