import { statSync } from "fs";
import { readdir, stat, mkdir } from "fs/promises";
import { resolve as pathResolve } from "path";
import { getDirentAbsolutePath } from "../../../_motifs/dirent/helpers/getDirentAbsolutePath";
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
  static ERROR_FOLDER_NOT_FOUND = "ERROR_FOLDER_NOT_FOUND";
  type: DirentType = "folder";
  name: string;
  path: string;
  content: FolderContent | undefined;

  /** Creates folder along given path,
   * if they do not already exists.
   *
   * @throws ERROR_FOLDER_NOT_FOUND on `mode === "read-only"` */
  static async pathRecursiveGuard(
    path: string,
    mode: "read-only" | "create" = "create"
  ): Promise<void> {
    const splitPath = path.split(/[\/\\]/g);
    if (splitPath.length === 0) return;
    const name = splitPath.pop() || "";
    const parentPath = splitPath.join("/");
    try {
      const direntAbsolutePath = getDirentAbsolutePath({
        path: parentPath,
        name,
      });
      await stat(direntAbsolutePath);
    } catch (err) {
      if (err.code === "ENOENT") {
        if (mode === "read-only")
          throw new Error(
            this.ERROR_FOLDER_NOT_FOUND +
              ": " +
              getDirentRelativePath({ path: parentPath, name })
          );
        await this.create({ path: parentPath, name });
      } else throw err;
    }
    return;
  }

  /** @todo create `content` */
  static async create(folderData: Pick<Folder, "path" | "name" | "content">) {
    const { path } = folderData;
    await this.pathRecursiveGuard(path);
    await mkdir(getDirentAbsolutePath({ ...folderData }));
    // content && create content
  }

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
            getDirentRelativePath({ name, path })
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
