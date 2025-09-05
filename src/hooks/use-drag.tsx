import { useState, useCallback, useRef, useEffect } from "react";

interface Position {
  top: number;
  left: number;
}

interface UseDragOptions {
  onDragStart?: (id: string) => void;
  onDragEnd?: (id: string) => void;
  onDrag?: (id: string, position: Position) => void;
}

export const useDrag = (options: UseDragOptions = {}) => {
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const dragStartPos = useRef<{ x: number; y: number; elementX: number; elementY: number } | null>(null);
  const dragId = useRef<string | null>(null);

  const handleMouseDown = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    const currentPosition = positions[id] || { top: 0, left: 0 };
    
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      elementX: currentPosition.left,
      elementY: currentPosition.top,
    };
    
    dragId.current = id;
    setIsDragging(id);
    options.onDragStart?.(id);
  }, [positions, options]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragStartPos.current || !dragId.current) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    const newPosition = {
      left: dragStartPos.current.elementX + deltaX,
      top: dragStartPos.current.elementY + deltaY,
    };

    // Garantir que não saia da tela
    newPosition.left = Math.max(0, Math.min(window.innerWidth - 300, newPosition.left));
    newPosition.top = Math.max(0, Math.min(window.innerHeight - 200, newPosition.top));

    setPositions(prev => ({
      ...prev,
      [dragId.current!]: newPosition,
    }));

    options.onDrag?.(dragId.current, newPosition);
  }, [isDragging, options]);

  const handleMouseUp = useCallback(() => {
    if (dragId.current) {
      options.onDragEnd?.(dragId.current);
    }
    setIsDragging(null);
    dragStartPos.current = null;
    dragId.current = null;
  }, [options]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const setPosition = useCallback((id: string, position: Position) => {
    setPositions(prev => ({
      ...prev,
      [id]: position,
    }));
  }, []);

  const getPosition = useCallback((id: string) => {
    return positions[id] || { top: 0, left: 0 };
  }, [positions]);

  const isElementDragging = useCallback((id: string) => {
    return isDragging === id;
  }, [isDragging]);

  return {
    handleMouseDown,
    getPosition,
    setPosition,
    isElementDragging,
    isDragging: isDragging !== null,
  };
};
