"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider id="ToggleTunes" initialPresence={{}}>
      <ClientSideSuspense
        fallback={
          <div className="w-full h-full text-4xl font-audimat flex justify-center items-center ">
            Loading…
          </div>
        }
      >
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
