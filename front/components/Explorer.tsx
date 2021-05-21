import * as React from "react";
import { Folder } from "../../_motifs/folder/folder";

export function Explorer({
  folder,
  setFolderPath,
}: {
  folder?: Folder;
  setFolderPath: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      {folder?.content?.map(({ name, path }) => (
        <div
          key={path}
          onClick={() => {
            console.log(path);
            setFolderPath(path);
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
