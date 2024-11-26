"use client";
import { useState, useRef, useEffect } from "react";
import VerticalProgressBar from "./VerticalProgressBar";
export function ProgressStatus({
  greenProgress,
  purpleProgress,
  redProgress,
  blueProgress,
}: {
  greenProgress: number;
  purpleProgress: number;
  redProgress: number;
  blueProgress: number;
}) {
  const [progressBarHeight, setProgressBarHeight] = useState(0);
  const progresBarHeightRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    setProgressBarHeight(progresBarHeightRef?.current?.clientHeight);
  }, []);

  const segments = 20;
  const gap = 10; // Gap between segments in pixels
  const segmentHeight = Math.ceil(progressBarHeight / segments);
  console.log(segmentHeight);
  const filledSegments = (colorProgress: number) => Math.ceil((colorProgress / 100) * segments); //convert from 60% to 12 /20 segment

  return (
    <>
      <section
        id="scoreboard-body"
        className=" bg-[url('/images/scoreboard-background-no-bg-line.svg')]
     bg-cover bg-no-repeat grid- h-full w-full  border-b-[1px] border-zinc-500 z-10"
        ref={progresBarHeightRef}
      >
        <div className="flex justify-evenly items-end  w-full h-full mx-auto">
          <VerticalProgressBar
            progressBarHeight={progressBarHeight}
            colorProgress={greenProgress}
            barColor="bg-gradient-green-progress-bar"
            color="green"
          />
          <VerticalProgressBar
            progressBarHeight={progressBarHeight}
            colorProgress={purpleProgress}
            barColor="bg-gradient-purple-progress-bar"
            color="purple"
          />
          <VerticalProgressBar
            progressBarHeight={progressBarHeight}
            colorProgress={redProgress}
            barColor="bg-gradient-red-progress-bar"
            color="red"
          />

          {/* <div
            className="w-[25%] bg-zinc-500 rounded-sm overflow-hidden"
            style={{ height: `${progressBarHeight}px` }}
            id="progress-bar-green"
          >
            <div
              className="bg-gradient-to-t from-ldgreen to-ldyellow w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${greenProgress}%`,
                marginTop: `${progressBarHeight - (greenProgress / 100) * progressBarHeight}px`,
              }}
            />
          </div>
          <div
            className="w-[20%] bg-zinc-500 rounded-sm overflow-hidden"
            style={{ height: `${progressBarHeight}px` }}
            id="progress-bar-purple"
          >
            <div
              className="bg-gradient-to-t from-lddred to-ldred w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${purpleProgress}%`,
                marginTop: `${progressBarHeight - (purpleProgress / 100) * progressBarHeight}px`,
              }}
            />
          </div>

          <div
            className="w-[20%] bg-zinc-500 rounded-sm overflow-hidden"
            style={{ height: `${progressBarHeight}px` }}
            id="progress-bar-red"
          >
            <div
              className="bg-gradient-to-t from-lddpurple to-ldpurple w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${redProgress}%`,
                marginTop: `${progressBarHeight - (redProgress / 100) * progressBarHeight}px`,
              }}
            />
          </div> */}
        </div>
      </section>
    </>
  );
}
