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

const inter = Inter({ subsets: ["latin"] });

export default function MusicApp({teamName}: any) {
  const { playlist, sidebar, userplaylist, adspace } = useFlags();
  console.log(playlist);
  console.log(sidebar);
  const [contextColor, setContextColor] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [stepOneComplete, setStepOneComplete] = useState(false);
  const [stepTwoComplete, setStepTwoComplete] = useState(false);
  const [stepThreeComplete, setStepThreeComplete] = useState(false);

          const apiURL = "/api/sse/";

          useEffect(() => {
            // first step trigger
            if ((playlist === true) && (stepOneComplete === false)) {
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
                  if (response.ok) {
                    setStepOneComplete(true);
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              firstTrigger();
            } else {
              console.log("You already completed this step");
            }

            // second step trigger
            if ((sidebar === true) && (stepTwoComplete === false)) {
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
            if ((userplaylist === true) && (stepThreeComplete === false)) {
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
          }, [playlist, sidebar, userplaylist, teamName]);

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
        <div
          className="flex flex-row bg-black gap-2"
        >
          {sidebar && (
            <div className="w-3/5 xl:w-1/5 min-h-screen">
              <SideBar />
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            style={{ maxHeight: 'calc(100vh - 150px)' }}
            className={`mx-auto rounded-xl pt-2 bg-ldbackground overflow-y-auto ${
              sidebar && adspace
                ? "w-2/5 xl:w-3/5"
                : sidebar
                ? "w-3/5 xl:w-4/5"
                : "w-full"
            }` }
          >
            {!sidebar && (
              <div className="">
                <img src="/images/tunes.png" className="ml-auto mr-5" />
              </div>
            )}

            <div 
              
            >
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
                <p className="text-2xl py-5">Trending Hits</p>
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
                        className="grid grid-cols-5 items-center w-full text-xl border-b-2 border-b-gray-600/40 py-2 hover:bg-gray-500/20"
                      >
                        <div className="col-span-1">
                          <img src={song.image} className="h-10 w-10 ml-8" />
                        </div>
                        <div className="col-span-1">
                          <p>{song.title}</p>
                        </div>
                        <div className="col-span-1 text-lg text-gray-500">
                          <p>{song.artists.join(", ")}</p>
                        </div>
                        <div className="col-span-1">
                          <p>{song.album}</p>
                        </div>
                        <div className="col-span-1">
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
              <img src={songs[currentSongIndex].image} className="h-28 mr-4" />
              <div>
                <p className="text-2xl">{songs[currentSongIndex].title}</p>
                <p className="text-xl text-gray-500">
                  {songs[currentSongIndex].artists.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex mx-auto justify-center space-x-4 items-center">
              <SkipBackIcon
                className="w-10 h-10 text-white"
                onClick={handlePreviousSong}
              />
              <Play className="w-10 h-10 text-white" />
              <SkipForwardIcon
                className="w-10 h-10 text-white"
                onClick={handleNextSong}
              />
            </div>
            <div className="absolute right-5 flex space-x-2 items-center justify-center">
              <SpeakerIcon className="w-8 h-8 text-white" />
              <Volume2 className="w-8 h-8 text-white" />
            </div>
          </div>
          {adspace && (
            <div className="w-2/5 xl:w-1/5 items-between flex flex-col justify-between"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
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
          <div className="text-center">
            <p className="text-2xl 2xl:text-7xl font-bold outfitters w-2/3 mx-auto">
              Launching ToggleTunes at AWS re:Invent
            </p>
          </div>
          <motion.div
            key={songs[currentSongIndex].id}
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex items-center justify-center w-full" // Added justify-center to center the image
          >
            <img
              src="/images/ld-light.png"
              className="mx-auto mt-8 2xl:mt-[100px] h-48 w-48 2xl:h-96 2xl:w-96"
            />
          </motion.div>

          <div className="absolute bottom-0 h-36 w-full items-center px-4 bg-ldbackground shadow-xl justify-center grid grid-cols-3">
            <div className="flex items-center ml-5">
              <img src="/images/ld-light.png" className="h-10 w-10 mr-4" />
              <div>
                <p className="text-2xl">{songs[currentSongIndex].title}</p>
                {/* <p className="text-xl text-gray-500">
              {songs[currentSongIndex].artists.join(", ")}
            </p> */}
              </div>
            </div>
            <div className="flex mx-auto justify-center space-x-4 items-center">
              <SkipBackIcon
                className="w-10 h-10 text-white"
                onClick={handlePreviousSong}
              />
              <Play className="w-10 h-10 text-white" />
              <SkipForwardIcon
                className="w-10 h-10 text-white"
                onClick={handleNextSong}
              />
            </div>
            <div className="flex space-x-2 items-center justify-center">
              <SpeakerIcon className="w-8 h-8 text-white" />
              <Volume2 className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* <div
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
                <p className="text-3xl xl:text-6xl 2xl:text-8xl font-bold z-20 outfitters pb-4">Welcome to ToggleTunes</p>
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
      </div> */}
        </motion.div>
      )}
    </div>
  );
}
