"use client";
import { useState } from "react";
9;

export function ProgressStatus({ greenProgress, purpleProgress, redProgress, blueProgress }: any) {
  const initialProgress = 30;
  const height = 300;
  const [progress, setProgress] = useState(initialProgress);

  const incrementProgress = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
  };
  return (
    <>
      <section
        id="scoreboard-body"
        className=" bg-[url('/images/scoreboard-background-no-bg.png')]
     bg-cover   h-full w-full 
   "
      >
        <div className="flex justify-evenly w-full h-full mx-auto">
          <div
            className="w-[25%] bg-blue-500 rounded-sm overflow-hidden"
            style={{ height: `${height}px` }}
          >
            <div
              className="bg-gradient-to-t from-ldgreen to-ldyellow w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${greenProgress}%`,
                marginTop: `${height - (greenProgress / 100) * height}px`,
              }}
            />
          </div>
          <div
            className="w-[25%] bg-blue-500 rounded-sm overflow-hidden"
            style={{ height: `${height}px` }}
          >
            <div
              className="bg-gradient-to-t from-lddred to-ldred w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${purpleProgress}%`,
                marginTop: `${height - (purpleProgress / 100) * height}px`,
              }}
            />
          </div>
          <div
            className="w-[25%] bg-blue-500 rounded-sm overflow-hidden"
            style={{ height: `${height}px` }}
          >
            <div
              className="bg-gradient-to-t from-lddpurple to-ldpurple w-full transition-all duration-300 ease-out rounded-sm"
              style={{
                height: `${redProgress}%`,
                marginTop: `${height - (redProgress / 100) * height}px`,
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
