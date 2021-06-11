import { readFile, rm } from "fs/promises";
import { ServerFile } from "./ServerFile";
import { ServerStateMock } from "../state/ServerState.mock";
import { getDirentAbsolutePath } from "../../../_motifs/dirent/helpers/getDirentAbsolutePath";
import { File } from "../../../_motifs/file/File";
import { ServerFolder } from "../folder/ServerFolder";

describe("ServerFile", () => {
  beforeAll(() => {
    ServerStateMock();
  });
  describe("constructor", () => {
    test("success on root folder file", () => {
      expect(new ServerFile({ name: "package.json", path: "" })).toBeInstanceOf(
        ServerFile
      );
    });
    test("success on root sub-folder file", () => {
      expect(
        new ServerFile({ name: "server.ts", path: "server" })
      ).toBeInstanceOf(ServerFile);
    });
    test("success on root file", () => {
      expect(
        new ServerFile({
          name: "ServerFile.spec.ts",
          path: "server/_motifs/file",
        })
      ).toBeInstanceOf(ServerFile);
    });
  });

  describe("(static) create", () => {
    test("actually creates a file at given path and with given content", async () => {
      const pathRecursiveGuard = jest
        .spyOn(ServerFolder, "pathRecursiveGuard")
        .mockReturnValue(Promise.resolve());
      const file: Pick<File, "path" | "name" | "content"> = {
        name: "temp",
        path: "_tests",
        content: "Hello !",
      };
      await ServerFile.create(file);
      expect(pathRecursiveGuard).toHaveBeenCalledWith(file.path);
      const absolutePath = getDirentAbsolutePath(file);
      expect(readFile(absolutePath, "utf-8")).resolves.toEqual("Hello !");
      await rm(absolutePath, { force: true, recursive: true });
    });
    test.todo(
      "makes use of ServerFolder.pathRecursiveGuard to creates missing folders in path"
    );
  });
});
