import { File } from "../file/file";
import { Folder } from "../folder/folder";

export type Dirent = Folder | File;

/** Used to keep dirent type while being sent on the network. */
export type DirentType = "folder" | "file";
