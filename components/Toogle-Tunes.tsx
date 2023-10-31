import Image from "next/image";
import { Inter } from "next/font/google";
import SideBar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import Greeting from "@/components/Greeting";
import { playlists, morePlaylists } from "../lib/data";
import PlaylistCard from "@/components/PlaylistCard";
import ItemCard from "@/components/ItemCard";
import { TeamModal } from "@/components/Team-Modal";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { asyncWithLDProvider, useFlags } from "launchdarkly-react-client-sdk";
import NoSSRWrapper from "@/components/nossr";
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

export default function ToggleTunes({teamName}: any) {
 const {playlist, userplaylist, sidebar} = useFlags();
      const [contextColor, setContextColor] = useState("");
      const [currentSongIndex, setCurrentSongIndex] = useState(0);
      const [openTeamModal, setOpenTeamModal] = useState(false);
        const [redProgress, setRedProgress] = useState(0);
        const [yellowProgress, setYellowProgress] = useState(0);
        const [blueProgress, setBlueProgress] = useState(0);
        const [winnerState, setWinnerState] = useState(false);
        const [resetScores, setResetScores] = useState(false);
        const [winnerName, setWinnerName] = useState("");
        const [isExploding, setIsExploding] = useState(false);
        const [timer, setTimer] = useState(300);
        const [isTimerRunning, setIsTimerRunning] = useState(false);
        const [greenProgress, setGreenProgress] = useState(0);
        const apiURL = '/api/sse/';


    useEffect(() => {
      // first step trigger
      if (playlist === true) {
        const firstTrigger = async () => {
          try {
            const firstStep = {
                event: "first step complete",
                teamname: `${teamName}`};
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
             const secondStep = {
               event: "second step complete",
               teamname: `${teamName}`,
             };
            const response = await fetch(`${apiURL}`, {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(secondStep),
            });
            await response.json();
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
               teamname: `${teamName}`,
             };
            const response = await fetch(`${apiURL}`, {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(thirdStep),
            });
            await response.json();
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

      useEffect(() => {
        if (resetScores) {
          setGreenProgress(0);
        }
        if (
          greenProgress >= 100 ||
          redProgress >= 100 ||
          yellowProgress >= 100 ||
          blueProgress >= 100
        ) {
          setWinnerState(true);
        } else {
          setWinnerState(false);
        }
        if (resetScores === true) {
          setGreenProgress(0);
          setResetScores(false);
          setIsTimerRunning(false);
          setTimer(300);
        }
      }, [playlist, sidebar, userplaylist, resetScores, isTimerRunning]);

  return (
    <div className="flex flex-col h-screen gap-2">
      {playlist ? (
        <div className="flex flex-row bg-black gap-2 ">
          {sidebar && (
            <div className="w-2/5 xl:w-1/5 min-h-screen">
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
            className={`h-screen mx-auto bg-ldgray ${
              sidebar ? "w-3/5 xl:w-4/5" : "w-full"
            }`}
          >
            {!sidebar && (
              <div className="py-5">
                <img src="/images/tunes.png" className="ml-auto mr-5" />
              </div>
            )}

            <div
              className="bg-context"
              id="playlist-container"
              style={
                {
                  minHeight: "600px",
                  background: `linear-gradient(${contextColor}, transparent)`,
                } as React.CSSProperties
              }
            >
              {userplaylist && (
                <div>
                  <div className="flex pt-4 ml-5 font-bold items-center z-10">
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

              <div className="relative flex py-5 ml-5 font-bold items-center z-10">
                <p className="text-2xl">Trending Hits</p>
              </div>
              <div className="ml-8">
                {userplaylist ? (
                  <div className="relative flex-row space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {songs.map((song, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          ease: [0, 0.71, 0.2, 1.01],
                          delay: index * 0.2,
                        }}
                        className="place-items-center border-white bg-gray-900/20 hover:bg-gray-900/50 rounded-lg inline-block py-4"
                      >
                        <img
                          className="p-4 object-cover transition-all hover:scale-105 h-48 w-48"
                          alt="astronaut"
                          src={song.image}

                          // style={{ width: "150px", height: "150px" }}
                        />
                        <p className="text-lg px-4">{song.title}</p>
                        <p className="text-sm px-4">{song.duration}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="relative flex flex-col w-full space-y-5 mx-auto overflow-auto h-4/5 z-10">
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

          <div className="absolute bottom-0 h-24 w-full items-center px-4 bg-ldgray shadow-xl justify-center grid grid-cols-3 border-t-8 border-t-black">
            <div className="flex items-center ml-5">
              <img
                src={songs[currentSongIndex].image}
                className="h-16 w-16 mr-4"
              />
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
            <div className="flex space-x-2 items-center justify-center">
              <SpeakerIcon className="w-8 h-8 text-white" />
              <Volume2 className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative bg-ldgray rounded-xl h-screen w-1/2 mx-auto flex-grow"
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
            className="flex items-center justify-center w-full max-h-screen" // Added justify-center to center the image
          >
            <img
              src="/images/ld-light.png"
              className="mx-auto mt-8 2xl:mt-[100px] h-48 w-48 2xl:h-96 2xl:w-96"
            />{" "}
          </motion.div>

          <div className="absolute bottom-0 h-24 w-full items-center px-4 bg-ldgray shadow-xl justify-center grid grid-cols-3">
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