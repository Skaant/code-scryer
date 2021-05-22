import { statSync } from "fs";
import { DirentType } from "../../../_motifs/dirent/Dirent";
import { resolve as pathResolve } from "path";
import { File, NetworkFile } from "../../../_motifs/file/File";
import { readFile } from "fs/promises";
import { ServerState } from "../state/ServerState";

export class ServerFile implements File {
  static ERROR_FOLDER_NOT_FOUND = "file not found";
  type: DirentType = "file";
  name: string;
  path: string;
  content?: any;
  contentString?: string;

  constructor({ name, path }: { name: string; path: string }) {
    if (!statSync(pathResolve(ServerState.get().options.projectPath + path)))
      throw new Error(ServerFile.ERROR_FOLDER_NOT_FOUND);
    this.name = name;
    this.path = path;
  }

  async provisionContent(): Promise<any> {
    if (!this.content) {
      this.content = await readFile(
        pathResolve(
          ServerState.get().options.projectPath + this.path,
          this.name
        ),
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
