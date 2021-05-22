import * as React from "react";
import { Explorer } from "../Explorer";
import { useDirentContent } from "./useDirentContent";

export function App() {
  const { dirent, setDirent, direntContent } = useDirentContent();
  return (
    <div>
      <h1>Welcome aboard the Code Scryer !</h1>
      <Explorer
        dirent={dirent}
        direntContent={direntContent}
        setDirent={setDirent}
      />
    </div>
  );
}
