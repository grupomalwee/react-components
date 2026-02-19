import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ZoomImage } from "./ZoomImage";
import { useIsMobile } from "@/hooks/use-mobile";
import { Lens } from "./Lens";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useMemo } from "react";

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
  isLoading?: boolean;
}

function CarouselSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full lg:p-10 sm:p-4 p-2", className)}>
      <div className="flex flex-col gap-3 h-full">
        <div className="relative overflow-hidden rounded-lg h-full">
          <div className="w-full h-full bg-muted rounded-lg overflow-hidden relative">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, hsl(var(--muted-foreground) / 0.08) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPositionX: ["200%", "-200%"] }}
              transition={{
                duration: 1.6,
                ease: "linear",
                repeat: Infinity,
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground/30"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </motion.div>
            </div>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted-foreground/10 border border-muted-foreground/10" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted-foreground/10 border border-muted-foreground/10" />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
              {[8, 32, 8, 8].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded-full bg-muted-foreground/20"
                  style={{ width: w }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  zoomEffect = null,
  download = false,
  isLoading = false,
}: CarouselBaseProps) {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const options = useMemo(() => ({ loop: true }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!autoPlay || items.length <= 1 || !emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, emblaApi]);

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

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          key="carousel-skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width, height }}
          className="h-full"
        >
          <CarouselSkeleton className={className} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="carousel-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn("w-full lg:p-10 sm:p-4 p-2", className)}
        style={{ width, height }}
      >
        <div className="flex flex-col gap-3 h-full">
          <div className={cn("relative h-full", containerClassName)}>
            <div
              ref={emblaRef}
              className="overflow-hidden rounded-lg h-full cursor-grab active:cursor-grabbing"
            >
              <div className="flex h-full">
                {items.map((item) => (
                  <div key={item.id} className="shrink-0 w-full h-full min-w-0">
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
              </div>
            </div>

            {download && (
              <motion.button
                onClick={handleDownload}
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className={cn(
                  "absolute top-4 right-4 z-50 p-2 rounded-full text-white transition-colors border border-white/10",
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
                  disabled={!emblaApi?.canScrollPrev()}
                  onClick={() => emblaApi?.scrollPrev()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-50
                    ${
                      !emblaApi?.canScrollPrev()
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
                  disabled={!emblaApi?.canScrollNext()}
                  onClick={() => emblaApi?.scrollNext()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-50
                    ${
                      !emblaApi?.canScrollNext()
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    onPointerDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
