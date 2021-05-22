import { DirentCore } from "../dirent/Dirent";

export type NetworkFile = DirentCore & {
  content?: string;
};

export interface File extends DirentCore {
  content?: any;
  contentString?: string;
}
