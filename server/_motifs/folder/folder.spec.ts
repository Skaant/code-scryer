import { ServerState } from "../state/state";
import { ServerFolder } from "./folder";
import { resolve as pathResolve } from "path";

describe("ServerFolder", () => {
  beforeAll(() => {
    ServerState.set({
      options: {
        projectPath: pathResolve(__dirname, "../../.."),
      },
    });
  });
  test("constructor", () => {
    const temp = new ServerFolder({
      name: "temp",
      path: "",
    });
    expect(temp).toBeInstanceOf(ServerFolder);
  });

  test("provisionContent", async () => {
    const temp = new ServerFolder({
      name: "temp",
      path: "",
    });
    const content = await temp.provisionContent();
    expect(content.find(({ name }) => name === "README.md")).toBeTruthy();
  });
});
