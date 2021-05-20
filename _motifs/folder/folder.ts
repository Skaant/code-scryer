import { File } from "../file/file";

export type FolderContent = (Folder | File)[];

export interface Folder {
  name: string;
  path: string;
  content: FolderContent | undefined;
}
