/** Used to keep dirent type while being sent on the network. */
export type DirentType = "folder" | "file";

export interface Dirent {
  type: DirentType;
  name: string;
  path: string;
}
