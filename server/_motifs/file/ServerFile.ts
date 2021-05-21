import { DirentType } from "../../../_motifs/dirent/Dirent";
import { File } from "../../../_motifs/file/File";

export class ServerFile implements File {
  type: DirentType = "file";
  name: string;
  path: string;

  constructor({ name, path }: { name: string; path: string }) {
    this.name = name;
    this.path = path;
  }
}
