import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";



const VerticalProgressBar= ({progressBarHeight}: {progressBarHeight:number}) => {
  const initialProgress = 0;
  const [progress, setProgress] = useState(initialProgress);

  const incrementProgress = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 5, 100));
  };

  const height = progressBarHeight;
  const segments = 20;
  // const markers = [20, 40, 60, 80];

  const segmentHeight = Math.floor(height / segments);
  const gap = 10; // Gap between segments in pixels
  const filledSegments = Math.floor((progress / 100) * segments);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center w-full">
      
        <div
          className="w-full bg-transparent rounded-none overflow-hidden relative flex flex-col-reverse justify-start items-center"
          style={{ height: `${height}px` }}
        >
      
          {Array.from({ length: segments }).map((_, index) => (
            <div
              key={index}
              className={`w-full rounded-nones transition-all duration-300 ease-out ${
                index < filledSegments ? "bg-red-500" : "bg-blue-500/20"
              }`}
              style={{
                height: `${segmentHeight - gap}px`,
                marginBottom: `${gap}px`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="mb-2">Volume: {progress}%</p>
        <Button onClick={incrementProgress} disabled={progress === 100}>
          Increase Volume
        </Button>
      </div>
    </div>
  );
};

export default VerticalProgressBar;
