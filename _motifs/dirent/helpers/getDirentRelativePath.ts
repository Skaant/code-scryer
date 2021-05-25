import { Dirent } from "../Dirent";

/** @returns {string} path **is not starting with a "/"**. */
export function getDirentRelativePath({ path, name }: Dirent): string {
  return `${path}${path && name ? "/" : ""}${name}`;
}
