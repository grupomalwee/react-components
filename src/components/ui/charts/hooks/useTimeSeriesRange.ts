import { useState, useCallback, useEffect, useRef } from "react";

interface UseTimeSeriesRangeProps {
  dataLength: number;
  defaultStartIndex?: number;
  defaultEndIndex?: number;
  onRangeChange?: (startIndex: number, endIndex: number) => void;
}

export function useTimeSeriesRange({
  dataLength,
  defaultStartIndex = 0,
  defaultEndIndex,
  onRangeChange,
}: UseTimeSeriesRangeProps) {
  const [startIndex, setStartIndex] = useState(defaultStartIndex);
  const [endIndex, setEndIndex] = useState(
    defaultEndIndex ?? Math.max(0, dataLength - 1),
  );
  const [isDragging, setIsDragging] = useState<
    "start" | "end" | "middle" | null
  >(null);

  const [dragStartX, setDragStartX] = useState(0);
  const [initialStartIndex, setInitialStartIndex] = useState(0);
  const [initialEndIndex, setInitialEndIndex] = useState(0);
  const brushRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dataLength > 0) {
      setStartIndex((prev) => Math.min(prev, dataLength - 1));
      setEndIndex((prev) => {
        if (prev >= dataLength - 2 || defaultEndIndex === undefined) {
          return dataLength - 1;
        }
        return Math.min(prev, dataLength - 1);
      });
    }
  }, [dataLength, defaultEndIndex]);

  const handleRangeChange = useCallback(
    (newStart: number, newEnd: number) => {
      const clampedStart = Math.max(0, Math.min(newStart, dataLength - 1));
      const clampedEnd = Math.max(
        clampedStart,
        Math.min(newEnd, dataLength - 1),
      );

      setStartIndex(clampedStart);
      setEndIndex(clampedEnd);

      if (onRangeChange) {
        onRangeChange(clampedStart, clampedEnd);
      }
    },
    [dataLength, onRangeChange],
  );

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent | React.TouchEvent,
      type: "start" | "end" | "middle",
    ) => {
      e.preventDefault();
      const isTouchEvent = "touches" in e;
      const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;

      setIsDragging(type);
      setDragStartX(clientX);
      setInitialStartIndex(startIndex);
      setInitialEndIndex(endIndex);
    },
    [startIndex, endIndex],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !brushRef.current) return;

      const isTouchEvent = "touches" in e;
      const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;

      const brushWidth = brushRef.current.offsetWidth;
      const deltaX = clientX - dragStartX;
      const indexDelta = Math.round((deltaX / brushWidth) * dataLength);

      if (isDragging === "start") {
        const newStart = Math.max(
          0,
          Math.min(initialStartIndex + indexDelta, endIndex - 1),
        );
        handleRangeChange(newStart, endIndex);
      } else if (isDragging === "end") {
        const newEnd = Math.max(
          startIndex + 1,
          Math.min(initialEndIndex + indexDelta, dataLength - 1),
        );
        handleRangeChange(startIndex, newEnd);
      } else if (isDragging === "middle") {
        const rangeSize = initialEndIndex - initialStartIndex;
        let newStart = initialStartIndex + indexDelta;
        let newEnd = initialEndIndex + indexDelta;

        if (newStart < 0) {
          newStart = 0;
          newEnd = rangeSize;
        } else if (newEnd >= dataLength) {
          newEnd = dataLength - 1;
          newStart = newEnd - rangeSize;
        }

        handleRangeChange(newStart, newEnd);
      }
    },
    [
      isDragging,
      dragStartX,
      dataLength,
      startIndex,
      endIndex,
      initialStartIndex,
      initialEndIndex,
      handleRangeChange,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleMouseMove);
        document.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    startIndex,
    endIndex,
    isDragging,
    brushRef,
    handleMouseDown,
  };
}
