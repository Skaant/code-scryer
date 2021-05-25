import { getDirentAbsolutePath } from "./getDirentAbsolutePath";
import { resolve as pathResolve } from "path";
import { ServerStateMock } from "../../../server/_motifs/state/ServerState.mock";

describe("getDirentAbsolutePath", () => {
  beforeAll(() => {
    ServerStateMock();
  });

  test("root folder path", () => {
    expect(
      getDirentAbsolutePath({ type: "folder", path: "", name: "" })
    ).toEqual(pathResolve(__dirname, "../../.."));
  });

  test("root folder file path", () => {
    expect(
      getDirentAbsolutePath({ type: "folder", path: "", name: ".gitignore" })
    ).toEqual(pathResolve(__dirname, "../../../.gitignore"));
  });
});
