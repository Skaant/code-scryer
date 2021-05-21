import { Dirent, DirentType } from "../dirent/Dirent";

export type FolderContent = Dirent[];

export interface Folder extends Dirent {
  content: FolderContent | undefined;
}
