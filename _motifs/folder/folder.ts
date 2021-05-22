import { Dirent, DirentCore } from "../dirent/Dirent";

export type FolderContent = Dirent[];

export type NetworkFolder = DirentCore & {
  content: FolderContent;
};

export interface Folder extends DirentCore {
  content?: FolderContent;
}
