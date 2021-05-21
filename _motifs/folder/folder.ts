import { Dirent } from "../dirent/Dirent";

export type FolderContent = Dirent[];

export interface Folder {
  name: string;
  path: string;
  content: FolderContent | undefined;
}
