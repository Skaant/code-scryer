import { ServerFolder } from "./ServerFolder";
import { ServerStateMock } from "../state/ServerState.mock";
import { stat, rm } from "fs/promises";
import { getDirentAbsolutePath } from "../../../_motifs/dirent/helpers/getDirentAbsolutePath";

describe("ServerFolder", () => {
  beforeAll(() => {
    ServerStateMock();
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

  describe("static pathRecursiveGuard", () => {
    describe("read-only mode", () => {
      describe("throws ERROR_FOLDER_NOT_FOUND: <currentPath + targetPath>", () => {
        test("root folder > folder", async () => {
          try {
            await ServerFolder.pathRecursiveGuard("narvalo", "read-only");
          } catch ({ message }) {
            expect(message).toEqual("ERROR_FOLDER_NOT_FOUND: narvalo");
          }
        });
        test("root sub-folder > folder", async () => {
          try {
            await ServerFolder.pathRecursiveGuard(
              "_motifs/cosmique",
              "read-only"
            );
          } catch ({ message }) {
            expect(message).toEqual("ERROR_FOLDER_NOT_FOUND: _motifs/cosmique");
          }
        });
        test("root sub3-folder > folder", async () => {
          try {
            await ServerFolder.pathRecursiveGuard(
              "server/_motifs/file/excelsior",
              "read-only"
            );
          } catch ({ message }) {
            expect(message).toEqual(
              "ERROR_FOLDER_NOT_FOUND: server/_motifs/file/excelsior"
            );
          }
        });
      });

      describe("does not throw on existing folders", () => {
        test("root folder > folder", () => {
          expect(async () =>
            expect(
              await ServerFolder.pathRecursiveGuard("_motifs", "read-only")
            ).not.toThrow()
          );
        });
        test("root sub-folder > folder", () => {
          expect(async () =>
            expect(
              await ServerFolder.pathRecursiveGuard(
                "front/components",
                "read-only"
              )
            ).not.toThrow()
          );
        });
      });
    });
    describe("create mode", () => {
      describe("creates missing folders through targetPath", () => {
        it("should create a ServerFolder_pathRecursiveGuard_1 folder in _tests", async () => {
          const [f1, f2, f3] = [
            "_tests",
            "ServerFolder_pathRecursiveGuard_1",
            "components",
          ];
          await ServerFolder.pathRecursiveGuard(f1 + "/" + f2 + "/" + f3);
          const stats = await stat(
            getDirentAbsolutePath({ path: f1 + "/" + f2, name: f3 })
          );
          expect(stats).toBeTruthy();
          await rm(getDirentAbsolutePath({ path: f1, name: f2 }), {
            force: true,
            recursive: true,
          });
          return;
        });
      });
    });
  });

  describe("static create", () => {});

  test("provisionContent", async () => {
    const temp = new ServerFolder({
      name: "",
      path: "",
    });
    const content = await temp.provisionContent();
    expect(content.find(({ name }) => name === "README.md")).toBeTruthy();
  });
});
