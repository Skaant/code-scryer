import { Dirent } from "../Dirent";

/** @returns {string} path **is not starting with a "/"**. */
export function getDirentRelativePath({
  path,
  name,
}: Pick<Dirent, "path" | "name">): string {
  return `${path}${path && name ? "/" : ""}${name}`;
}
