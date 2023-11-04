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
import {
  LucideSlidersHorizontal,
  Music,
  Music2Icon,
  Play,
  SkipBackIcon,
  SkipForwardIcon,
  Speaker,
  SpeakerIcon,
  Volume,
  Volume2,
} from "lucide-react";
import { songs } from "../lib/data";
import { useFlags } from "launchdarkly-react-client-sdk";
import { FaPlay } from "react-icons/fa";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoPlaySharp } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";

const inter = Inter({ subsets: ["latin"] });

export default function MusicApp({ teamName }: any) {
  const { playlist, sidebar, userplaylist, adspace } = useFlags();
  console.log(playlist);
  console.log(sidebar);
  const [contextColor, setContextColor] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [stepOneComplete, setStepOneComplete] = useState(false);
  const [stepTwoComplete, setStepTwoComplete] = useState(false);
  const [stepThreeComplete, setStepThreeComplete] = useState(false);
  const [volumeVisibility, setVolumeVisibility] = useState(true);
  const apiURL = "/api/sb-score-add/";

          useEffect(() => {
            // first step trigger
            if (playlist === true) {
              const firstTrigger = async () => {
                try {
                  const firstStep = {
                    event: "first step complete",
                    team: {
                      name: `${teamName}`,
                      stepCompleted: 'stepOneComplete',
                    },
                  };
                  const response = await fetch(`${apiURL}`, {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(firstStep),
                  });
                  await response.json();
                } catch (err) {
                  console.error(err);
                }
              };
              firstTrigger();
            } else {
              console.log("You already completed this step");
            }

            // second step trigger
            if (sidebar === true) {
              const secondTrigger = async () => {
                try {
                  console.log(teamName)
                  const secondStep = {
                    event: "second step complete",
                    team: {
                      name: `${teamName}`,
                      stepCompleted: "stepTwoComplete",
                    },
                  };
                  const response = await fetch(`${apiURL}`, {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(secondStep),
                  });
                  await response.json();
                  if (response.ok) {
                      setStepTwoComplete(true);
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              secondTrigger();
            }
            // second step trigger
            if (userplaylist === true) {
              const thirdTrigger = async () => {
                try {
                  const thirdStep = {
                    event: "third step complete",
                    team: {
                      name: `${teamName}`,
                      stepCompleted: 'stepThreeComplete',
                    },
                  };
                  const response = await fetch(`${apiURL}`, {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(thirdStep),
                  });
                  await response.json();
                  if (response.ok) {
                    setStepThreeComplete(true)
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              thirdTrigger();
            }
          }, [playlist, sidebar, userplaylist]);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const handleMouseEnter = (color: string) => setContextColor(color);

  return (
    <div className="flex flex-col h-screen gap-2 font-sohne bg-black overflow-x-hidden">
      {playlist ? (
        <div className="flex flex-row bg-black gap-2">
          {sidebar && (
            <div className="w-3/5 xl:w-1/5 min-h-screen" style={{ maxHeight: "calc(100vh - 150px)" }} >
              <SideBar playlist={playlist} userplaylist={userplaylist} />
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            style={{ maxHeight: "calc(100vh - 150px)" }}
            className={`mx-auto rounded-xl pt-2 bg-ldbackground overflow-y-auto ${
              sidebar && adspace
                ? "w-2/5 xl:w-3/5"
                : sidebar
                ? "w-3/5 xl:w-4/5"
                : "w-full"
            }`}
          >
            {!sidebar && (
              <div className="">
                <img src="/images/tunes.png" className="ml-auto mr-5" />
              </div>
            )}

            <div>
              {userplaylist && (
                <div>
                  <PageHeader />

                  <div className="flex ml-5 font-bold items-center z-10">
                    <p className="text-2xl">Recommended Playlist</p>
                  </div>

                  <div className="relative grid gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6 mx-8 z-10">
                    {playlists.map((playlist, index) => (
                      <div>
                        <ItemCard
                          playlist={playlist}
                          onMouseEnter={handleMouseEnter}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="relative flex  ml-5 font-bold items-center">
                {userplaylist ? (
                  <p className="text-2xl py-5">Trending Hits</p>
                ) : (
                  <div className="flex items-center space-x-4">
                    <IoIosMusicalNotes className="w-10 h-10 text-ldcomplicatedwhite" />
                    <p className="text-2xl py-5">Track List</p>
                  </div>
                )}
              </div>
              <div className="ml-8">
                {userplaylist ? (
                  <div className="relative flex-row space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {songs.map((song, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          ease: [0, 0.71, 0.2, 1.01],
                          delay: index * 0.2,
                        }}
                        className="place-items-center border-white bg-ldinputback rounded-md hover:bg-gray-900/50  inline-block py-4"
                      >
                        <img
                          className="p-4 object-cover transition-all hover:scale-105 h-48 w-48"
                          alt="astronaut"
                          src={song.image}

                          // style={{ width: "150px", height: "150px" }}
                        />
                        <p className="text-lg px-4 text-center font-sohne pb-4">
                          {song.title}
                        </p>
                        <p className="text-xs text-gray-500 px-4 text-center font-sohne font-thin">
                          {song.duration}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="relative flex flex-col w-full space-y-2 mx-auto overflow-auto h-4/5 z-10 scrollbar-hide"
                    style={{ maxHeight: "calc(100vh - 250px)" }}
                  >
                    {songs.map((song, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0, 0.71, 0.2, 1.01],
                          delay: index * 0.2,
                        }}
                        key={song.id}
                        className="grid grid-cols-5  w-full text-xl border-b-2 border-b-gray-600/40 py-4 hover:bg-gray-500/20"
                      >
                        <div className="">
                          {playlist && !userplaylist ? (
                            <Music2Icon className="h-10 w-10 ml-8" />
                          ) : (
                            <img src={song.image} className="h-10 w-10 ml-8" />
                          )}
                        </div>
                        <div className="">
                          <p>{song.title}</p>
                        </div>
                        <div className=" text-lg text-gray-500">
                          <p>{song.artists.join(", ")}</p>
                        </div>
                        <div className="">
                          <p>{song.album}</p>
                        </div>
                        <div className="">
                          <p>{song.duration}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 h-36 w-full items-center px-4 bg-ldbackground shadow-xl justify-center grid grid-cols-3 ">
            <div className="flex items-center ml-5">
              {playlist && !userplaylist ? (
                <Music2Icon className="h-14 w-14 mr-4" />
              ) : (
                <img
                  src={songs[currentSongIndex].image}
                  className="h-28 mr-4"
                />
              )}
              <div>
                <p className="text-2xl">{songs[currentSongIndex].title}</p>
                <p className="text-xl text-gray-500">
                  {songs[currentSongIndex].artists.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center space-x-12 items-center">
                <IoPlaySkipBackSharp
                  className="w-7 h-7 text-ldskipbuttons"
                  onClick={handlePreviousSong}
                />
                <IoPlaySharp className="w-10 h-10 text-ldcomplicatedwhite" />
                <IoPlaySkipForwardSharp
                  className="w-7 h-7 text-ldskipbuttons"
                  onClick={handleNextSong}
                />
              </div>
              <div className="w-full h-2 bg-lddarkstatus rounded-full mt-6">
                <div
                  className="h-full text-center  bg-white rounded-full"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>

            <div className="absolute right-5 flex space-x-2 items-center justify-center">
              {/* <SpeakerIcon className="w-8 h-8 text-ldcomplicatedwhite" /> */}
              <IoMdVolumeHigh
                className="w-8 h-8 text-ldcomplicatedwhite"
                onClick={() => setVolumeVisibility(!volumeVisibility)}
              />
              {volumeVisibility && (
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="accent-white  w-14 md:w-28"
                />
              )}
            </div>
          </div>
          {adspace && (
            <div
              className="w-2/5 xl:w-1/5 items-between flex flex-col justify-between"
              style={{ maxHeight: "calc(100vh - 150px)" }}
            >
              <img src="/images/AD1.png" className="self-start" />
              <img src="/images/AD2.png" className="self-end" />
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative bg-ldbackground rounded-xl h-screen w-1/2 mx-auto flex-grow"
        >
          <div className="py-5">
            <img src="/images/tunes.png" className="ml-auto mr-5" />
          </div>
          <div className="flex flex-col  items-center text-center justify-center">
            <p className="text-2xl 2xl:text-7xl font-bold outfitters w-2/3 mx-auto">
              Launching ToggleTunes at AWS re:Invent
            </p>
            <motion.div
            key={songs[currentSongIndex].id}
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex items-center justify-center w-full"
          >
            <img
              src="/images/ld-light.png"
              className="m-auto mt-8 2xl:mt-[100px] h-48 w-48 2xl:h-96 2xl:w-96"
            />
          </motion.div>
          </div>
          

          <div className="absolute bottom-0 h-36 w-full items-center px-4 bg-ldbackground shadow-xl justify-center grid grid-cols-3 ">
            <div className="flex items-center ml-2">
              {playlist && !userplaylist ? (
                <Music2Icon className="h-14 w-14 mr-2" />
              ) : (
                <img
                  src={songs[currentSongIndex].image}
                  className="h-12 mr-4"
                />
              )}
              <div>
                <p className="text-lg">{songs[currentSongIndex].title}</p>
                <p className="text-md text-gray-500">
                  {songs[currentSongIndex].artists.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center space-x-12 items-center">
                <IoPlaySkipBackSharp
                  className="w-7 h-7 text-ldskipbuttons"
                  onClick={handlePreviousSong}
                />
                <IoPlaySharp className="w-10 h-10 text-ldcomplicatedwhite" />
                <IoPlaySkipForwardSharp
                  className="w-7 h-7 text-ldskipbuttons"
                  onClick={handleNextSong}
                />
              </div>
              <div className="w-full h-2 bg-lddarkstatus rounded-full mt-6">
                <div
                  className="h-full text-center  bg-white rounded-full"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>

            <div className="absolute right-5 flex space-x-2 items-center justify-center">
              {/* <SpeakerIcon className="w-8 h-8 text-ldcomplicatedwhite" /> */}
              <IoMdVolumeHigh
                className="w-8 h-8 text-ldcomplicatedwhite"
                onClick={() => setVolumeVisibility(!volumeVisibility)}
              />
              {volumeVisibility && (
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="accent-white  w-14 md:w-28"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
