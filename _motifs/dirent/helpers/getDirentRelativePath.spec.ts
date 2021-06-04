import { getDirentRelativePath } from "./getDirentRelativePath";

describe("getDirentRelativePath", () => {
  test("root folder path", () => {
    expect(getDirentRelativePath({ path: "", name: "" })).toEqual("");
  });

  test("root folder file path", () => {
    expect(getDirentRelativePath({ path: "", name: "README.md" })).toEqual(
      "README.md"
    );
  });

  test("root sub-folder path (path:'', name:'...')", () => {
    expect(getDirentRelativePath({ path: "", name: "front" })).toEqual("front");
  });

  test("root sub-folder path (path:'...', name:'')", () => {
    expect(
      getDirentRelativePath({
        path: "front",
        name: "",
      })
    ).toEqual("front");
  });

  test("root sub-folder file path", () => {
    expect(
      getDirentRelativePath({
        path: "front",
        name: ".gitignore",
      })
    ).toEqual("front/.gitignore");
  });
});
