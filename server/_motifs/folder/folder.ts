import { statSync } from "fs";
import { readdir } from "fs/promises";
import { resolve as pathResolve } from "path";
import { File } from "../file/file";

/** `list` may be more optimized for path searches while `node` can hold custom properties. */
export type FolderContentFormat = "list" | "node";

export type FolderGetContentProps = {
  recursive: boolean;
  format: FolderContentFormat;
};

export type FolderContent = (Folder | File)[];

export class Folder {
  static ERROR_FOLDER_NOT_FOUND = "folder not found";
  name!: string;
  path!: string;
  cache: {
    content?: FolderContent;
  } = {};

  constructor({ name, path }: { name: string; path: string }) {
    if (!statSync(path)) throw new Error(Folder.ERROR_FOLDER_NOT_FOUND);
    this.name = name;
    this.path = path;
  }

  async getContent({}: FolderGetContentProps = {}): Promise<FolderContent> {
    const dirents = await readdir(this.path, { withFileTypes: true });
    return dirents.map((dirent) =>
      dirent.isFile()
        ? new File({
            name: dirent.name,
            path: pathResolve(this.path, dirent.name),
          })
        : new Folder({
            name: dirent.name,
            path: pathResolve(this.path, dirent.name),
          })
    );
  }
}
