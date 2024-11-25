"use client";
import { useState, useRef, useEffect } from "react";

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
  const height = 100;
  const [progressBarHeight, setProgressBarHeight] = useState(0);
  const [greenHeight, setGreenHeight] = useState(0);
  const [redHeight, setRedHeight] = useState(0);
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
     bg-contain bg-no-repeat grid- h-full w-full  border-b-[1px] border-zinc-500"
        ref={progresBarHeightRef}
      >
        <div className="flex justify-evenly items-end  w-full h-full mx-auto">
          <div
            className="w-[25%] bg-zinc-500 rounded-sm overflow-hidden"
            style={{ height: `${progressBarHeight}px` }}
            id="progress-bar-green"
          >
            <div
              className="bg-gradient-to-t from-ldgreen to-ldyellow w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${greenProgress}%`,
                marginTop: `${progressBarHeight - ((greenProgress / 100) * progressBarHeight)}px`,
              }}
            />
          </div>

          <div
            className="w-[25%] bg-zinc-500 rounded-sm overflow-hidden"
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
            className="w-[25%] bg-zinc-500 rounded-sm overflow-hidden"
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
          </div>
        </div>

        {/* 
        <div className="relative col-span-1 col-start-1 row-span-5 h-full w-full overflow-hidden p-8">
          <div
            className="h-full w-full flex-1 bg-gradient-to-t from-ldgreen to-ldyellow transition-all"
            style={{ transform: `translateY(${100 - (greenProgress || 0)}%)` }}
          ></div>
        </div>

        <div className="relative col-span-1 col-start-2 row-span-5 h-full w-full overflow-hidden p-8">
          <div
            className="h-full w-full flex-1 bg-gradient-to-t from-lddred to-ldred transition-all"
            style={{ transform: `translateY(${100 - (redProgress || 0)}%)` }}
          ></div>
        </div>
        <div className="relative col-span-1 col-start-3 row-span-5 h-full w-full overflow-hidden p-8">
          <div
            className="h-full w-full flex-1 bg-gradient-to-t from-lddpurple to-ldpurple transition-all"
            style={{
              transform: `translateY(${100 - (purpleProgress || 0)}%)`,
            }}
          ></div>
        </div> */}
        {/* <div className="relative col-span-1 col-start-4 row-span-5 h-full w-full overflow-hidden p-8">
          <div
            className="h-full w-full flex-1 bg-gradient-to-t from-lddblue to-ldblue transition-all"
            style={{ transform: `translateY(${100 - (blueProgress || 0)}%)` }}
          ></div>
        </div> */}
      </section>
    </>
  );
}
