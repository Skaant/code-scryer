import { readFile } from "fs/promises";
import { ServerFile } from "./ServerFile";
import { ServerStateMock } from "../state/ServerState.mock";
import { getDirentAbsolutePath } from "../../../_motifs/dirent/helpers/getDirentAbsolutePath";

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

  describe("static create", () => {
    test("actually creates a file at given path and with given content", async () => {
      const fileMeta = {
        name: "temp",
        path: "_tests",
        content: "Hello !",
      };
      await ServerFile.create(fileMeta);
      const content = await readFile(
        getDirentAbsolutePath({ ...fileMeta }),
        "utf-8"
      );
      expect(content).toEqual("Hello !");
    });
  });
});
