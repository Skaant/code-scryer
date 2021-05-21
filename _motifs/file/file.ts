import { Dirent, DirentType } from "../dirent/Dirent";

export interface File extends Dirent {
  type: DirentType;
}
