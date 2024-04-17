import { Button } from "@/components/ui/button";
import React from "react";
import { Code as CodeHighlight } from "bright";
import DiffView from "@/components/diff/Diff";

const DiffHome = () => {
  return (
    <main className="p-4 flex flex-col">
      <div className="flex gap-4 justify-between">
        <h1 className="text-3xl font-bold mb-4 text-center text-muted-foreground">
          File Diff viewer
        </h1>
        <div className="flex gap-4">
          <Button>Unified view</Button>
          <Button>Split view</Button>
        </div>
      </div>
      <div className="w-full">
      <DiffView/>
      </div>
      {/* <CodeHighlight lang="py" code="hi" theme="github-dark">
        print("hello brightness")
      </CodeHighlight> */}
    </main>
  );
};

export default DiffHome;
