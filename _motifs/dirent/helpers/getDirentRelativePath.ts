import { Dirent } from "../Dirent";

export function getDirentRelativePath(dirent?: Dirent): string {
  return dirent
    ? `${dirent.path}${dirent.path.endsWith("/") ? "" : "/"}${dirent.name}`
    : "/";
}
