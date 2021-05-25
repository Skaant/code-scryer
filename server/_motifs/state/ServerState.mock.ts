import { ServerState } from "./ServerState";
import { resolve as pathResolve } from "path";

export const ServerStateMock = () => {
  ServerState.set({
    options: {
      projectPath: pathResolve(__dirname, "../../.."),
    },
  });
};
