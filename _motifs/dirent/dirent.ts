import { File } from "../file/File";
import { Folder } from "../folder/Folder";

export type Dirent = Folder | File;

/** Used to keep dirent type while being sent on the network. */
export type DirentType = "folder" | "file";
