import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Lens } from "./Lens";
import { ZoomImage } from "./ZoomImage";
import { useIsMobile } from "@/hooks/use-mobile";

export interface CarouselItem {
  id: number | string;
  url: string;
  title: string;
}

export interface CarouselBaseProps {
  items: CarouselItem[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  width?: string;
  height?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
  zoomEffect?: "lens" | "scale" | null;
  download?: boolean;
}

export function CarouselBase({
  items,
  className,
  containerClassName,
  imageClassName,
  width,
  height,
  showControls = true,
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  springConfig = {
    stiffness: 300,
    damping: 30,
  },
  zoomEffect = null,
  download = false,
}: CarouselBaseProps) {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: "spring",
        stiffness: springConfig.stiffness,
        damping: springConfig.damping,
      });
    }
  }, [index, x, springConfig.stiffness, springConfig.damping]);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadSuccess(false);

    const currentItem = items[index];
    try {
      const response = await fetch(currentItem.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = currentItem.title || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (error) {
      console.error("Error downloading image:", error);
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={cn("w-full lg:p-10 sm:p-4 p-2", className)}
      style={{ width, height }}
    >
      <div className="flex flex-col gap-3 h-full">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg h-full",
            containerClassName,
          )}
          ref={containerRef}
        >
          <motion.div className="flex h-full" style={{ x }}>
            {items.map((item) => (
              <div key={item.id} className="shrink-0 w-full h-full">
                {isMobile || zoomEffect === "scale" ? (
                  <ZoomImage
                    src={item.url}
                    alt={item.title}
                    className={cn("w-full h-full select-none")}
                    imageClassName={imageClassName}
                    borderRadius={8}
                    maxZoom={3.0}
                  />
                ) : zoomEffect === "lens" ? (
                  <Lens>
                    <img
                      src={item.url}
                      alt={item.title}
                      className={cn(
                        "w-full h-full object-cover rounded-lg select-none pointer-events-none",
                        imageClassName,
                      )}
                      draggable={false}
                    />
                  </Lens>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className={cn(
                      "w-full h-full object-cover rounded-lg select-none pointer-events-none",
                      imageClassName,
                    )}
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {download && (
            <motion.button
              onClick={handleDownload}
              className={cn(
                "absolute top-4 right-4 z-30 p-2 rounded-full text-white transition-colors border border-white/10",
                downloadSuccess
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-black/50 hover:bg-black/70",
              )}
              title="Download image"
              initial={false}
              animate={{
                scale: isDownloading ? 0.9 : 1,
                backgroundColor: downloadSuccess
                  ? "rgb(34, 197, 94)"
                  : "rgba(0, 0, 0, 0.5)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDownloading ? (
                  <motion.svg
                    key="loading"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 1,
                    }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </motion.svg>
                ) : downloadSuccess ? (
                  <motion.svg
                    key="success"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="download"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {showControls && (
            <>
              <motion.button
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-30
                  ${
                    index === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "bg-secondary hover:scale-110 hover:opacity-100 opacity-70"
                  }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <motion.button
                disabled={index === items.length - 1}
                onClick={() =>
                  setIndex((i) => Math.min(items.length - 1, i + 1))
                }
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-30
                  ${
                    index === items.length - 1
                      ? "opacity-40 cursor-not-allowed"
                      : "bg-secondary hover:scale-110 hover:opacity-100 opacity-70"
                  }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </>
          )}

          {showIndicators && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
