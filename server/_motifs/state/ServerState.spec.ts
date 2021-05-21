import { ServerState } from "./ServerState";

describe("ServerState", () => {
  test("get & set", () => {
    ServerState.set({
      alpha: 3,
      options: {
        projectPath: "temp",
      },
    });
    expect(ServerState.get().alpha).toEqual(3);
    expect(ServerState.get().options.projectPath).toEqual("temp");
  });
});
