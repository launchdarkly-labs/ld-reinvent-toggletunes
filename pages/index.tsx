import Image from "next/image";
import { Inter } from "next/font/google";
import SideBar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import Greeting from "@/components/Greeting";
import { playlists, morePlaylists } from "../lib/data";
import PlaylistCard from "@/components/PlaylistCard";
import ItemCard from "@/components/ItemCard";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [contextColor, setContextColor] = useState(""); 

  const handleMouseEnter = (color: string) => setContextColor(color); 

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }} 
    transition={{
      duration: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    }} className="bg-gray-900 h-full">
      <div
        id="playlist-container"
        className="relative bg-context"
        style={
          {
            minHeight: "300px",
            backgroundColor: contextColor,
          } as React.CSSProperties
        }
      >
        <PageHeader />
        <div className="grid place-content-center pt-10 border-2 border-gray-600/50 shadow-2xl rounded-2xl m-4">
                <p className="text-8xl font-bold z-20 outfitters pb-4">Welcome to ToggleTunes</p>
                <p className="text-4xl mx-auto z-20 my-10">Streaming now!</p>
              </div>
        <div className="relative z-10 px-6">
          <Greeting />
          <div className="grid gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6">
            {playlists.map((playlist) => (
              <ItemCard playlist={playlist} onMouseEnter={handleMouseEnter} />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80"></div>
      </div>
      <div className="px-6 relative z-10 mt-4">
        <h2 className="text-2xl font-bold">Made for you</h2>
        <div className="flex flex-wrap mt-6 gap-4">
          {morePlaylists.map((playlist) => (
            <PlaylistCard playlist={playlist} />
          ))}
        </div>
      </div>
      </motion.div>
  );
}
