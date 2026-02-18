import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LensProps {
  children: React.ReactNode;
  initialZoom?: number;
  maxZoom?: number;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

export const Lens: React.FC<LensProps> = ({
  children,
  initialZoom = 1.5,
  maxZoom = 4.0,
  lensSize = 150,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localIsHovering, setLocalIsHovering] = useState(false);
  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const [zoomFactor, setZoomFactor] = useState(initialZoom);
  const [isActivated, setIsActivated] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isActivated) return;
    const delta = -e.deltaY * 0.005;
    setZoomFactor((prev) => Math.min(Math.max(1.1, prev + delta), maxZoom));
  };

  const resetZoom = () => {
    setZoomFactor(initialZoom);
    setIsActivated(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg z-20 h-full",
        isActivated ? "cursor-none" : "cursor-pointer",
      )}
      onClick={() => setIsActivated(!isActivated)}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        resetZoom();
      }}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      {children}

      {isStatic ? (
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 100%, transparent 100%)`,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
          {/* ... lens border ... */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: position.x - lensSize / 2,
              top: position.y - lensSize / 2,
              width: lensSize,
              height: lensSize,
              borderRadius: "50%",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)",
              background:
                "radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)",
            }}
          />
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && isActivated && (
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                    mousePosition.x
                  }px ${mousePosition.y}px, black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle ${
                    lensSize / 2
                  }px at ${mousePosition.x}px ${
                    mousePosition.y
                  }px, black 100%, transparent 100%)`,
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  zIndex: 50,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  }}
                >
                  {children}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute pointer-events-none z-[60]"
                style={{
                  left: mousePosition.x - lensSize / 2,
                  top: mousePosition.y - lensSize / 2,
                  width: lensSize,
                  height: lensSize,
                  borderRadius: "50%",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)",
                  background:
                    "radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)",
                }}
              />
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
