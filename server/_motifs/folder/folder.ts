import { statSync } from "fs";
import { readdir } from "fs/promises";
import { resolve as pathResolve } from "path";
import { File } from "../file/file";

/**
 * * `string` may be more optimized for path searches,
 * * `node` can hold custom properties. */
type FolderContentFormat = "string" | "node";

type FolderGetContentProps = {
  format: FolderContentFormat;
  /** Can only be `true` if `format === "string"`. */
  recursive: boolean;
};

type FolderContent = (Folder | File)[];

type FolderConstructorOptions = {
  /** Pre-load `cache.content` at instanciation ? */
  getContent?: boolean;
};
export class Folder {
  static ERROR_FOLDER_NOT_FOUND = "folder not found";
  name!: string;
  path!: string;
  private cache: {
    content?: FolderContent;
  } = {};

  constructor({ name, path }: { name: string; path: string }) {
    if (!statSync(path)) throw new Error(Folder.ERROR_FOLDER_NOT_FOUND);
    this.name = name;
    this.path = path;
  }

  async provisionContent(): Promise<FolderContent> {
    if (!this.cache.content) {
      const dirents = await readdir(this.path, { withFileTypes: true });
      this.cache.content = dirents.map((dirent) => {
        const props = {
          name: dirent.name,
          path: pathResolve(this.path, dirent.name),
        };
        return dirent.isFile() ? new File(props) : new Folder(props);
      });
    }
    return this.cache.content;
  }

  get content() {
    return this.cache.content;
  }
}
