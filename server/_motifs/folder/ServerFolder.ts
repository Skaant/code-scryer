import { statSync } from "fs";
import { readdir } from "fs/promises";
import { resolve as pathResolve } from "path";
import { getDirentRelativePath } from "../../../_motifs/dirent/helpers/getDirentRelativePath";
import { ServerFile } from "../file/ServerFile";
import {
  Folder,
  FolderContent,
  NetworkFolder,
} from "../../../_motifs/folder/Folder";
import { ServerState } from "../state/ServerState";
import { DirentType } from "../../../_motifs/dirent/Dirent";
import { File } from "../../../_motifs/file/File";

export class ServerFolder implements Folder {
  static ERROR_FOLDER_NOT_FOUND = "folder not found";
  type: DirentType = "folder";
  name: string;
  path: string;
  content: FolderContent | undefined;

  /** @throws {Error} "ERROR_FOLDER_NOT_FOUND" */
  constructor({
    name,
    path,
    content,
  }: {
    name: string;
    path: string;
    content?: FolderContent;
  }) {
    try {
      !statSync(
        pathResolve(
          ServerState.get().options.projectPath +
            "/" +
            getDirentRelativePath({ type: this.type, name, path })
        )
      );
    } catch (err) {
      if (err.code === "ENOENT")
        throw new Error(ServerFolder.ERROR_FOLDER_NOT_FOUND);
      throw err;
    }
    this.name = name;
    this.path = path;
    this.content = content;
  }

  async provisionContent(): Promise<FolderContent> {
    if (!this.content) {
      const dirents = await readdir(
        pathResolve(
          ServerState.get().options.projectPath + this.path,
          this.name
        ),
        {
          withFileTypes: true,
        }
      );
      this.content = dirents.map((dirent) => {
        const props = {
          name: dirent.name,
          path: this.path + "/" + this.name,
        };
        return dirent.isFile()
          ? (new ServerFile(props) as File)
          : (new ServerFolder(props) as Folder);
      });
    }
    return this.content;
  }

  async toNetwork() {
    const { type, path, name } = this;
    const content = await this.provisionContent();
    return { type, path, name, content } as NetworkFolder;
  }
}
