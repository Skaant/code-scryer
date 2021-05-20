import { statSync } from "fs";
import { readdir } from "fs/promises";
import { resolve as pathResolve } from "path";
import { ServerFile } from "../file/file";
import { Folder, FolderContent } from "../../../_motifs/folder/folder";

export class ServerFolder implements Folder {
  static ERROR_FOLDER_NOT_FOUND = "folder not found";
  name: string;
  path: string;
  content: FolderContent | undefined;

  constructor({
    name,
    path,
    content,
  }: {
    name: string;
    path: string;
    content?: FolderContent;
  }) {
    if (!statSync(path)) throw new Error(ServerFolder.ERROR_FOLDER_NOT_FOUND);
    this.name = name;
    this.path = path;
    this.content = content;
  }

  async provisionContent(): Promise<FolderContent> {
    if (!this.content) {
      const dirents = await readdir(this.path, { withFileTypes: true });
      this.content = dirents.map((dirent) => {
        const props = {
          name: dirent.name,
          path: pathResolve(this.path, dirent.name),
        };
        return dirent.isFile()
          ? new ServerFile(props)
          : new ServerFolder(props);
      });
    }
    return this.content;
  }
}
