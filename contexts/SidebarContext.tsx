"use client";
import React, { createContext, useContext, useState } from "react";

// Assuming you intended to import something, but it's unclear, please specify.
// Correct the import statement according to your requirement.

const SidebarContext = createContext({
  isSidebarOpen: false,
  showSidebar: () => {},
  closeSidebar: () => {}
});

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, showSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export { SidebarProvider };