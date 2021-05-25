import { ServerState } from "../state/ServerState";
import { ServerFolder } from "./ServerFolder";
import { resolve as pathResolve } from "path";

describe("ServerFolder", () => {
  beforeAll(() => {
    ServerState.set({
      options: {
        projectPath: pathResolve(__dirname, "../../.."),
      },
    });
  });

  describe("constructor", () => {
    test("success on root folder", () => {
      expect(
        new ServerFolder({
          name: "router",
          path: "node_modules/express/lib",
        })
      ).toBeInstanceOf(ServerFolder);
    });

    test("success on root sub-folder", () => {
      expect(
        new ServerFolder({
          name: "router",
          path: "node_modules/express/lib",
        })
      ).toBeInstanceOf(ServerFolder);
    });

    test("success on root sub-3-folder", () => {
      expect(
        new ServerFolder({
          name: "router",
          path: "node_modules/express/lib",
        })
      ).toBeInstanceOf(ServerFolder);
    });

    test("throws on folder not found", () => {
      expect(
        () =>
          new ServerFolder({
            name: "temp",
            path: "",
          })
      ).toThrowError(ServerFolder.ERROR_FOLDER_NOT_FOUND);
    });
  });

  test("provisionContent", async () => {
    const temp = new ServerFolder({
      name: "",
      path: "",
    });
    const content = await temp.provisionContent();
    expect(content.find(({ name }) => name === "README.md")).toBeTruthy();
  });
});
