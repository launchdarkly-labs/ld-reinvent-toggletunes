"use client";
import * as React from "react";

export function ProgressStatus({ greenProgress, purpleProgress, redProgress, blueProgress }: any) {
  return (
    <section id="scoreboard-body" 
    className="grid grid-rows-5 bg-[url('/images/scoreboard-background-no-bg.png')]
     bg-cover grid-cols-3 h-full w-full font-sohne
      border-zinc-500 place-items-stretch gap-10">
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
      </div>
      {/* <div className="relative col-span-1 col-start-4 row-span-5 h-full w-full overflow-hidden p-8">
          <div
            className="h-full w-full flex-1 bg-gradient-to-t from-lddblue to-ldblue transition-all"
            style={{ transform: `translateY(${100 - (blueProgress || 0)}%)` }}
          ></div>
        </div> */}
    </section>
  );
}
