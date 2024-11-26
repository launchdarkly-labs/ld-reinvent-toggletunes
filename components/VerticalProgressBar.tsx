import React, { useState, useRef, useEffect } from "react";

const VerticalProgressBar = ({
  progressBarHeight,
  colorProgress,
  barColor,
  color,
}: {
  progressBarHeight: number;
  colorProgress: number;
  barColor: string;
  color: string;
}) => {


  const segments = 20;
  const gap = 10; // Gap between segments in pixels
  const segmentHeight = Math.ceil(progressBarHeight / segments);
  const filledSegments = (colorProgress: number) => Math.ceil((colorProgress / 100) * segments); //convert from 60% to 12 /20 segment

  return (
    <div
      className="w-[20%] bg-transparent rounded-none overflow-hidden relative flex flex-col-reverse justify-start items-center"
      style={{ height: `${progressBarHeight}px` }}
      id={`progress-bar-${color}`}
    >
      {Array.from({ length: segments }).map((_, index) => {
        return (
          <div
            key={index}
            className={`w-full rounded-none transition-all duration-300 ease-out ${
              index < filledSegments(colorProgress) ? barColor : "bg-zinc-500/20"
            }`}
            style={{
              height: `${segmentHeight - gap}px`,
              marginBottom: `${index == 0 ? 30 : gap}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default VerticalProgressBar;
