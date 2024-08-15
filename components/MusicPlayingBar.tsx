import React, { useState } from "react";
import { IoIosMusicalNotes, IoMdVolumeHigh } from "react-icons/io";
import { IoPlaySharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { songs } from "@/lib/data";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Music2Icon } from "lucide-react";

const MusicPlayingBar = () => {
  const {
    tracklist ,
    userplaylist ,
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
    <section className="absolute bottom-0 h-36 w-full items-center px-4 bg-ldbackground shadow-xl justify-center grid grid-cols-3 ">
      <div className="flex items-center ml-5">
        {tracklist == true && userplaylist == true ? (
          <img src={songs[currentSongIndex].image} className="h-28 mr-4" />
        ) : tracklist == true && userplaylist == false ? (
          <Music2Icon className="h-14 w-14 mr-4" />
        ) : null}
        <div>
          <p className="text-2xl">{songs[currentSongIndex].title}</p>
          <p className="text-xl text-gray-500">{songs[currentSongIndex].artists}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-12 items-center">
          <IoPlaySkipBackSharp
            className="w-7 h-7 text-ldskipbuttons"
            onClick={handlePreviousSong}
          />
          <IoPlaySharp className="w-10 h-10 text-ldcomplicatedwhite" />
          <IoPlaySkipForwardSharp className="w-7 h-7 text-ldskipbuttons" onClick={handleNextSong} />
        </div>
        <div className="w-full h-2 bg-lddarkstatus rounded-full mt-6">
          <div className="h-full text-center  bg-white rounded-full" style={{ width: "10%" }}></div>
        </div>
      </div>

      <div className="absolute right-5 flex space-x-2 items-center justify-center">
        {/* <SpeakerIcon className="w-8 h-8 text-ldcomplicatedwhite" /> */}
        <IoMdVolumeHigh
          className="w-8 h-8 text-ldcomplicatedwhite"
          onClick={() => setVolumeVisibility(!volumeVisibility)}
        />
        {volumeVisibility && (
          <input type="range" min={0} max={100} className="accent-white  w-14 md:w-28" />
        )}
      </div>
    </section>
  );
};

export default MusicPlayingBar;
