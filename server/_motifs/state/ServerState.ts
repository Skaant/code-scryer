import { ServerOptions } from "../../options/options";

type ServerStateContent = {
  [key: string]: any;
  options: ServerOptions;
};

export class ServerState {
  private static content: ServerStateContent;

  private constructor(options: ServerOptions) {
    ServerState.content = { options };
  }

  /** @param compoundKey `state.compound.key.prop` */
  static get(compoundKey?: string) {
    return ServerState.content;
  }

  static set(newContent: Partial<ServerStateContent>) {
    ServerState.content = {
      ...ServerState.content,
      ...newContent,
    };
  }
}
