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
      <h2>Explorer {folder && `(${folder.path + "/" + folder.name})`}</h2>
      {(folder?.path || folder?.name) && (
        <div
          onClick={() => {
            folder && setFolderPath(folder.path);
          }}
        >
          <i>Retour</i>
        </div>
      )}
      {folder?.content?.map(({ type, name, path }) =>
        type === "folder" ? (
          <div
            key={path + "/" + name}
            onClick={() => {
              setFolderPath(path + "/" + name);
            }}
          >
            <b>{name}</b>
          </div>
        ) : (
          <div>{name}</div>
        )
      )}
    </div>
  );
}
