export class File {
  name!: string;
  path!: string;

  constructor({ name, path }: { name: string; path: string }) {
    this.name = name;
    this.path = path;
  }
}
