import React, { useState } from "react";
import { IoIosMusicalNotes, IoMdVolumeHigh } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoPlaySharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { songs } from "@/lib/data";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Music2Icon } from "lucide-react";
import { motion } from "framer-motion";

const MusicPlayingBar = () => {
  const {
    tracklist = true,
    userplaylist = false,
  }: {
    tracklist: boolean;
    userplaylist: boolean;
  } = useFlags();

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volumeVisibility, setVolumeVisibility] = useState(true);
  const handleNextSong = (): void => {
    setCurrentSongIndex((prevIndex: number) => (prevIndex + 1) % songs.length);
  };

  const handlePreviousSong = (): void => {
    setCurrentSongIndex((prevIndex: number) => (prevIndex - 1 + songs.length) % songs.length);
  };
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className=" h-[18rem] sm:h-36 w-full items-center py-8 sm:py-8  px-8 bg-ldbackground shadow-xl 
      justify-between flex flex-col sm:flex-row"
      id="music-playing-bar"
    >
      <div className="flex justify-center sm:justify-normal w-full sm:w-[33%]">
        {tracklist == true && userplaylist == true ? (
          <img src={songs[currentSongIndex].image} className="h-28 mr-4 hidden sm:block" />
        ) : tracklist == true && userplaylist == false ? (
          <Music2Icon className="h-14 w-14 mr-4 hidden sm:block" />
        ) : null}
        <div className=" relative flex overflow-x-hidden w-full">
          <div className="animate-marquee sm:animate-none whitespace-nowrap flex items-center flex-row sm:flex-col sm:items-start sm:justify-center">
            <p className="text-2xl">{songs[currentSongIndex].title}</p>
            <GoDotFill className="block sm:hidden mx-2" />
            <p className="text-2xl sm:text-xl text-gray-500  ">{songs[currentSongIndex].artists}</p>
            <GoDotFill className="block sm:hidden mx-2" />
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center  sm:hidden">
            <p className="text-2xl ">{songs[currentSongIndex].title}</p>
            <GoDotFill className="block sm:hidden mx-2" />
            <p className="text-2xl sm:text-xl text-gray-500 ">{songs[currentSongIndex].artists}</p>
            <GoDotFill className="block sm:hidden mx-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full sm:w-[33%]">
        <div className="flex justify-center gap-x-12 items-center">
          <IoPlaySkipBackSharp
            className="w-7 h-7 text-ldskipbuttons"
            onClick={handlePreviousSong}
          />
          <IoPlaySharp className="w-10 h-10 text-ldcomplicatedwhite" />
          <IoPlaySkipForwardSharp className="w-7 h-7 text-ldskipbuttons" onClick={handleNextSong} />
        </div>
        <div className="w-full h-2 bg-lddarkstatus rounded-full mt-6">
          <div className="h-full text-center  bg-white rounded-full w-[10%]"></div>
        </div>
      </div>

      <div className=" flex gap-x-2 items-center justify-center sm:justify-end w-full sm:w-[33%] ">
        <IoMdVolumeHigh
          className="w-8 h-8 text-ldcomplicatedwhite"
          onClick={() => setVolumeVisibility(!volumeVisibility)}
        />
        {volumeVisibility && (
          <input type="range" min={0} max={100} className="accent-white  w-full sm:w-14 md:w-28"  defaultValue={100}/>
        )}
      </div>
    </motion.section>
  );
};

export default MusicPlayingBar;
