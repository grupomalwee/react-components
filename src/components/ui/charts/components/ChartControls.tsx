import React from "react";
import { Highlights, ShowOnly, PeriodsDropdown } from "../components";
import { ChartData, MapperConfig } from "../types/chart.types";

type Props = {
  allKeys: string[];
  mapperConfig: MapperConfig;
  finalColors: Record<string, string>;
  highlightedSeries: Set<string>;
  toggleHighlight: (k: string) => void;
  showOnlyHighlighted: boolean;
  setShowOnlyHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
  highlightedSeriesSize: number;
  clearHighlights: () => void;
  enableHighlights?: boolean;
  enableShowOnly?: boolean;
  enablePeriodsDropdown?: boolean;
  enableDraggableTooltips?: boolean;
  processedData?: ChartData[];
  onOpenPeriod?: (p: string) => void;
  rightOffset?: number;
  activePeriods?: string[];
  containerClass?: string;
  containerWidth?: number;
};

export default function ChartControls({
  allKeys,
  mapperConfig,
  finalColors,
  highlightedSeries,
  toggleHighlight,
  showOnlyHighlighted,
  setShowOnlyHighlighted,
  highlightedSeriesSize,
  clearHighlights,
  enableHighlights,
  enableShowOnly,
  enablePeriodsDropdown,
  enableDraggableTooltips,
  processedData,
  onOpenPeriod,
  rightOffset,
  activePeriods,
  containerClass,
  containerWidth,
}: Props) {
  return (
    <div className={containerClass}>
      {enableHighlights && (
        <Highlights
          allKeys={allKeys}
          mapperConfig={mapperConfig}
          finalColors={finalColors}
          highlightedSeries={highlightedSeries}
          toggleHighlight={toggleHighlight}
          containerWidth={containerWidth}
        />
      )}

      {enableShowOnly && (
        <ShowOnly
          showOnlyHighlighted={showOnlyHighlighted}
          setShowOnlyHighlighted={setShowOnlyHighlighted}
          highlightedSeriesSize={highlightedSeriesSize}
          clearHighlights={clearHighlights}
        />
      )}

      {enablePeriodsDropdown && enableDraggableTooltips && (
        <div className="ml-auto flex items-center">
          <PeriodsDropdown
            processedData={processedData ?? []}
            onOpenPeriod={onOpenPeriod ?? (() => {})}
            rightOffset={rightOffset}
            activePeriods={activePeriods}
          />
        </div>
      )}
    </div>
  );
}
