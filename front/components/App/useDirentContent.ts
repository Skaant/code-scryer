import { useEffect, useState } from "react";
import { Dirent } from "../../../_motifs/dirent/Dirent";
import { getDirentRelativePath } from "../../../_motifs/dirent/helpers/getDirentRelativePath";
import { NetworkFile } from "../../../_motifs/file/File";
import { FolderContent, NetworkFolder } from "../../../_motifs/folder/Folder";

export type NetworkDirent = NetworkFolder | NetworkFile;

export function useDirentContent() {
  const [dirent, setDirent] = useState<Dirent>();
  const [direntContent, setDirentContent] = useState<string | FolderContent>();
  useEffect(() => {
    fetch(
      `http://localhost:9001/${
        dirent?.type || "folder"
      }?path=${getDirentRelativePath(dirent)}`
    )
      .then((res) => res.json())
      .then(({ content }: NetworkDirent) => setDirentContent(content));
  }, [dirent]);
  return { dirent, setDirent, direntContent };
}
