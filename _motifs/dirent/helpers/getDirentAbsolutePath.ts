import { ServerState } from "../../../server/_motifs/state/ServerState";
import { Dirent } from "../Dirent";
import { getDirentRelativePath } from "./getDirentRelativePath";

export function getDirentAbsolutePath(dirent: Dirent): string {
  const absoluteRootPath = ServerState.get().options.projectPath;
  const relativePath = getDirentRelativePath(dirent);
  return absoluteRootPath + (relativePath ? "/" + relativePath : "");
}
