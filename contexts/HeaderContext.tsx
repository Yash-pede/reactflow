"use client ";
import { usePathname } from "next/navigation";
// HeaderContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

interface HeaderContextType {
  headerTitle: string;
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderContext = createContext<HeaderContextType>({
  headerTitle: "",
  setHeaderTitle: () => {},
});

export const HeaderProvider: any = ({ children }: any) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const path = usePathname().split("/");
  useEffect(() => {
    setHeaderTitle(path[1]);
  }, [path[1]]);
  return (
    <HeaderContext.Provider value={{ headerTitle, setHeaderTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  return useContext(HeaderContext);
};
