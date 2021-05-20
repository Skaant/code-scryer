import { ServerOptions } from "../../options/options";

type ServerStateContent = {
  [key: string]: any;
  options: ServerOptions;
};

export class ServerState {
  content: ServerStateContent;

  constructor(options: ServerOptions) {
    this.content = { options };
  }

  /** @param compoundKey `state.compound.key.prop` */
  get(compoundKey?: string) {
    if (compoundKey) {
      const splitKey = compoundKey.split(".");
      return splitKey.reduce((content, key) => content[key], this.content);
    }
    return this.content;
  }

  /** @param newContent `state.compound.key.prop` */
  set(newContent: Partial<ServerStateContent>) {
    this.content = {
      ...this.content,
      ...newContent,
    };
  }
}
