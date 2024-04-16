import React, { createContext, useContext, useState } from "react";

interface FilePathContextType {
  filePath: string[];
  setFilePath: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilePathContext = createContext<FilePathContextType | undefined>(
  undefined
);

export const FilePathProvider = ({ children }: any) => {
  const [filePath, setFilePath] = useState<string[]>([]);

  return (
    <FilePathContext.Provider value={{ filePath, setFilePath }}>
      {children}
    </FilePathContext.Provider>
  );
};

export const useFilePath = () => {
  const context = useContext(FilePathContext);
  if (!context) {
    throw new Error("useFilePath must be used within a FilePathProvider");
  }
  return context;
};
