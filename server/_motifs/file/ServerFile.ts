import { statSync } from "fs";
import { DirentType } from "../../../_motifs/dirent/Dirent";
import { resolve as pathResolve } from "path";
import { File, NetworkFile } from "../../../_motifs/file/File";
import { readFile, writeFile } from "fs/promises";
import { ServerState } from "../state/ServerState";
import { getDirentRelativePath } from "../../../_motifs/dirent/helpers/getDirentRelativePath";
import { getDirentAbsolutePath } from "../../../_motifs/dirent/helpers/getDirentAbsolutePath";

export class ServerFile implements File {
  static ERROR_FOLDER_NOT_FOUND = "file not found";
  type: DirentType = "file";
  name: string;
  path: string;
  content?: any;
  contentString?: string;

  static async create({
    content,
    ...fileData
  }: Pick<File, "path" | "name" | "content">) {
    // folder recursive guard
    await writeFile(getDirentAbsolutePath({ ...fileData }), content, "utf-8");
  }

  constructor({ name, path }: { name: string; path: string }) {
    const splitParent = path.split("/");
    const parentName = splitParent.pop() || "";
    if (
      !statSync(
        getDirentAbsolutePath({ path: splitParent.join("/"), name: parentName })
      )
    )
      throw new Error(ServerFile.ERROR_FOLDER_NOT_FOUND);
    this.name = name;
    this.path = path;
  }

  async provisionContent(): Promise<any> {
    if (!this.content) {
      this.content = await readFile(
        getDirentAbsolutePath({
          path: this.path,
          name: this.name,
        }),
        {
          encoding: "utf-8",
        }
      );
    }
    return this.content;
  }

  async toNetwork() {
    const { type, path, name } = this;
    const content = await this.provisionContent();
    return {
      type,
      path,
      name,
      content: JSON.stringify(content),
    } as NetworkFile;
  }
}
