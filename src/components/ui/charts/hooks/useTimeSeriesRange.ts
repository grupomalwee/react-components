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
      console.log(newStart, newEnd)
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
    (e: React.MouseEvent, type: "start" | "end" | "middle") => {
      e.preventDefault();
      setIsDragging(type);
      setDragStartX(e.clientX);
      setInitialStartIndex(startIndex);
      setInitialEndIndex(endIndex);
    },
    [startIndex, endIndex],
  );
  
  const handleTouchMove = useCallback(
    (e: React.TouchEvent, type: "start" | "end" | "middle") => {
      e.preventDefault();
      setIsDragging(type);
      setDragStartX(e.touches[0].clientX);
      setInitialStartIndex(startIndex);
      setInitialEndIndex(endIndex);
    },
    [startIndex, endIndex],
  )

  const teste = useCallback(
    (e:TouchEvent) => {
      if (!isDragging || !brushRef.current) return;

      const brushWidth = brushRef.current.offsetWidth;
      const deltaX = e.touches[0].clientX - dragStartX;
      const indexDelta = Math.round((deltaX / brushWidth) * dataLength);

      console.log(isDragging)
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
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !brushRef.current) return;
      
      const brushWidth = brushRef.current.offsetWidth;
      const deltaX = e.clientX - dragStartX;
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
      brushRef.current?.addEventListener('touchmove', teste);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        brushRef.current?.removeEventListener('touchmove', teste);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    startIndex,
    endIndex,
    isDragging,
    brushRef,
    handleMouseDown,
    handleTouchMove
  };
}
