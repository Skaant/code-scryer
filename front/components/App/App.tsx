import * as React from "react";
import { Explorer } from "../Explorer";
import { useDirentContent } from "./useDirentContent";
import { FoundationStoneSvg } from "../_images/FoundationStoneSvg";

export function App() {
  const { dirent, setDirent, direntContent } = useDirentContent();
  return (
    <div>
      <FoundationStoneSvg style={{ height: "256px", width: "256px" }} />
      <h1>Welcome aboard the Code Scryer !</h1>
      <Explorer
        dirent={dirent}
        direntContent={direntContent}
        setDirent={setDirent}
      />
    </div>
  );
}
