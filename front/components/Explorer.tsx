import * as React from "react";
import { Dirent } from "../../_motifs/dirent/Dirent";
import { getDirentRelativePath } from "../../_motifs/dirent/helpers/getDirentRelativePath";
import { FolderContent } from "../../_motifs/folder/Folder";

export function Explorer({
  dirent,
  direntContent,
  setDirent,
}: {
  dirent?: Dirent;
  direntContent?: string | FolderContent;
  setDirent: React.Dispatch<React.SetStateAction<Dirent | undefined>>;
}) {
  return (
    <div>
      <h2>Explorer {dirent && `(${getDirentRelativePath(dirent)})`}</h2>
      {(dirent?.path || dirent?.name) && (
        <div
          onClick={() => {
            const splitPath = dirent.path.replace(/[\\]/g, "/").split("/");
            const name = splitPath.pop() || "";
            setDirent({
              type: "folder",
              name,
              path: splitPath.join("/"),
            });
          }}
        >
          <i>Retour</i>
        </div>
      )}
      {direntContent &&
        (typeof direntContent === "string" ? (
          <div>{direntContent}</div>
        ) : (
          direntContent?.map((dirent: Dirent) => {
            const { type, path, name } = dirent;
            return type === "folder" ? (
              <div
                key={path + "/" + name}
                onClick={() => {
                  setDirent(dirent);
                }}
              >
                <b>{name}</b>
              </div>
            ) : (
              <div>{name}</div>
            );
          })
        ))}
    </div>
  );
}
