import { getDirentRelativePath } from "./getDirentRelativePath";

describe("getDirentRelativePath", () => {
  test("root folder path", () => {
    expect(
      getDirentRelativePath({ type: "folder", path: "", name: "" })
    ).toEqual("");
  });

  test("root folder file path", () => {
    expect(
      getDirentRelativePath({ type: "file", path: "", name: "README.md" })
    ).toEqual("README.md");
  });

  test("root sub-folder path (path:'', name:'...')", () => {
    expect(
      getDirentRelativePath({ type: "folder", path: "", name: "front" })
    ).toEqual("front");
  });

  test("root sub-folder path (path:'...', name:'')", () => {
    expect(
      getDirentRelativePath({
        type: "folder",
        path: "front",
        name: "",
      })
    ).toEqual("front");
  });

  test("root sub-folder file path", () => {
    expect(
      getDirentRelativePath({
        type: "folder",
        path: "front",
        name: ".gitignore",
      })
    ).toEqual("front/.gitignore");
  });
});
