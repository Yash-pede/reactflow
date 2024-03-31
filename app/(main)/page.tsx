"use client";
import InfoBar from "@/components/InfoBar/InfoBar";
import Flow from "@/components/canvas/Canvas";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function Dashboard() {
  return (
    <main>
      <div className="hidden md:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={75} maxSize={100}>
            <Flow />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            className="!overflow-auto max-h-[calc(100vh-60px)] relative"
            defaultSize={25}
            maxSize={40}
            minSize={20}
          >
            <InfoBar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="md:hidden">
        <InfoBar />
      </div>
    </main>
  );
}
