import { File } from "../file/File";
import { Folder } from "../folder/Folder";

/** Used to keep dirent type while being sent on the network. */
export type DirentType = "folder" | "file";

export interface DirentCore {
  type: DirentType;
  name: string;
  path: string;
}

export type Dirent = Folder | File;
