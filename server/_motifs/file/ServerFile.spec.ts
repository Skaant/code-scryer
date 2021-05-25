import { ServerState } from "../state/ServerState";
import { ServerFile } from "./ServerFile";
import { resolve as pathResolve } from "path";
import { ServerStateMock } from "../state/ServerState.mock";

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
    test.todo("actually creates a file at given path and with given content");
  });
});
