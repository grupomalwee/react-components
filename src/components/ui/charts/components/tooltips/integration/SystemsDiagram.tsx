import React, { useRef } from "react";
import { SystemNode } from "./SystemNode";
import { Beam } from "./Beam";

export const SystemsDiagram: React.FC<{
  isInput: boolean;
  currentSystem: string;
  externalSystem: string;
}> = ({ isInput, currentSystem, externalSystem }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between py-1 px-3"
    >
      <div ref={leftRef}>
        <SystemNode label={isInput ? externalSystem : currentSystem} />
      </div>
      <div ref={rightRef}>
        <SystemNode label={isInput ? currentSystem : externalSystem} />
      </div>
      <Beam
        isInput={isInput}
        containerRef={containerRef}
        leftRef={leftRef}
        rightRef={rightRef}
      />
    </div>
  );
};
