"use client";
import { diffFile1, diffFile2 } from "@/lib/Constants";
import React from "react";
import DiffViewer from "react-diff-viewer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold as highlightTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

//funky for dark mode
// coldarkCold for light mode
const DiffView = () => {
  const highlightSyntax = (str: any) => (
    <SyntaxHighlighter
      language="python"
      style={highlightTheme}
      customStyle={{
        padding: "0px",
        display: "inline",
        margin: "0px",
        whiteSpace: "pre-wrap",
        background: "transparent !important",
      }}
    >
      {str}
    </SyntaxHighlighter>
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <DiffViewer
        oldValue={diffFile1}
        newValue={diffFile2}
        splitView={true}
        styles={{
          line: {
            whiteSpace: "normal",
            wordBreak: "break-all",
          },
        }}
        showDiffOnly
        renderContent={highlightSyntax}
      />
    </div>
  );
};

export default DiffView;
