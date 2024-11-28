"use client";
import { useState, useRef, useEffect } from "react";
import VerticalProgressBar from "./VerticalProgressBar";
import { PURPLE, RED, BLUE, GREEN } from "@/lib/constant";

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

  return (
    <>
      <section
        id="scoreboard-body"
        className=" bg-[url('/images/scoreboard-background-no-bg-line.svg')]
     bg-contain bg-no-repeat grid- h-full w-full  border-b-[1px] border-zinc-500 z-10"
        ref={progresBarHeightRef}
      >
        <div className="flex justify-evenly items-end  w-full h-full mx-auto">
          <VerticalProgressBar
            progressBarHeight={progressBarHeight}
            colorProgress={redProgress}
            barColor="bg-gradient-red-progress-bar"
            color={RED}
          />
          <VerticalProgressBar
            progressBarHeight={progressBarHeight}
            colorProgress={blueProgress}
            barColor="bg-gradient-blue-progress-bar"
            color={BLUE}
          />
          <VerticalProgressBar
            progressBarHeight={progressBarHeight}
            colorProgress={purpleProgress}
            barColor="bg-gradient-purple-progress-bar"
            color={PURPLE}
          />
        </div>
      </section>
    </>
  );
}
