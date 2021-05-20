import { ServerState } from "./state";

describe("ServerState", () => {
  test("instanciation", () => {
    const temp = new ServerState({
      projectPath: "temp",
    });
    expect(temp).toBeInstanceOf(ServerState);
  });

  test("get", () => {
    const temp = new ServerState({
      projectPath: "temp",
    });
    expect(temp.get("options.projectPath")).toEqual("temp");
  });

  test("set", () => {
    const temp = new ServerState({
      projectPath: "temp",
    });
    temp.set({ alpha: 3 });
    expect(temp.get("alpha")).toEqual(3);
    expect(temp.get("options.projectPath")).toEqual("temp");
  });
});
