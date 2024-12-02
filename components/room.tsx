"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveObject, LiveList, LiveMap } from "@liveblocks/client";
import { RED, BLUE, PURPLE, GREEN } from "@/lib/constant";

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id="ToggleTunes"
      initialPresence={{}}
      initialStorage={{
        people: new LiveMap([
          [
            "alicia",
            new LiveObject({
              name: "Alicia",
              pets: new LiveList(["Fido", "Felix"]),
            }),
          ],
        ]),
        // totalPoints: new LiveMap([
        //   [
        //     RED,
        //     new LiveObject({
        //       name: RED,
        //       totalPoint: 0,
        //     }),
        //   ],
        //   [
        //     BLUE,
        //     new LiveObject({
        //       name: BLUE,
        //       totalPoint: 0,
        //     }),
        //   ],
        //   [
        //     PURPLE,
        //     new LiveObject({
        //       name: PURPLE,
        //       totalPoint: 0,
        //     }),
        //   ],
        // ]),
        animals: new LiveList(["Fidoooo"]),
      }}
    >
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
