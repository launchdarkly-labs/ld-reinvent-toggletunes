import SideBar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { playlists } from "../lib/data";
import ItemCard from "@/components/ItemCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Music2, Music2Icon, Sparkle } from "lucide-react";
import { songs } from "../lib/data";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoPlaySharp } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";

export default function MusicApp({ teamName }: any) {
  const { playlist, sidebar, userplaylist, adspace, newToggleDB } = useFlags();

  const ldClient = useLDClient();

  console.log(playlist);
  console.log(sidebar);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [stepOneComplete, setStepOneComplete] = useState(false);
  const [stepTwoComplete, setStepTwoComplete] = useState(false);
  const [stepThreeComplete, setStepThreeComplete] = useState(false);
  const [stepFourComplete, setStepFourComplete] = useState(false);
  const [stepFiveComplete, setStepFiveComplete] = useState(false);
  const [volumeVisibility, setVolumeVisibility] = useState(true);
  const [playlistAPI, setPlaylistAPI] = useState([]);
  const [songsAPI, setSongsAPI] = useState([]);
  const [upgradeAd, setUpgradeAd] = useState(true);

  const apiURL = "/api/sb-score-add/";

  useEffect(() => {
    // first step trigger
    if (playlist === true) {
      console.log("first step running")
      const firstTrigger = async () => {
        try {
          const firstStep = {
            event: "first step complete",
            team: {
              name: `${teamName}`,
              stepCompleted: "stepOneComplete",
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
          console.log(teamName);
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
    // third step trigger
    if (newToggleDB === "complete") {
      const thirdTrigger = async () => {
        try {
          const thirdStep = {
            event: "third step complete",
            team: {
              name: `${teamName}`,
              stepCompleted: "stepThreeComplete",
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
            setStepThreeComplete(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
      thirdTrigger();
    }

    if (userplaylist === true) {
      const fourthTrigger = async () => {
        try {
          const fourthStep = {
            event: "fourth step complete",
            team: {
              name: `${teamName}`,
              stepCompleted: "stepFourComplete",
            },
          };
          const response = await fetch(`${apiURL}`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fourthStep),
          });
          await response.json();
          if (response.ok) {
            setStepFourComplete(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fourthTrigger();
    }

    if (adspace === true) {
      const fifthTrigger = async () => {
        try {
          const fifthStep = {
            event: "fifth step complete",
            team: {
              name: `${teamName}`,
              stepCompleted: "stepFiveComplete",
            },
          };
          const response = await fetch(`${apiURL}`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fifthStep),
          });
          await response.json();
          if (response.ok) {
            setStepFiveComplete(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fifthTrigger();
    }
  }, [playlist, sidebar, userplaylist, adspace, newToggleDB]);

  useEffect(() => {
    setPlaylistAPI([]);
    const fetchPlaylists = async () => {
      try {
        const subroute = window.location.pathname.split("/")[1];
        const response = await fetch(`/api/playlists/?team=${subroute}`);
        const data = await response.json();
        await setPlaylistAPI(data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSongs = async () => {
      try {
        const subroute = window.location.pathname.split("/")[1];
        const response = await fetch(`/api/songs/?team=${subroute}`);
        const data = await response.json();
        await setSongsAPI(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylists();
    fetchSongs();
  }, [newToggleDB]);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const handleSubscriptionClick = async () => {
    const context: any = ldClient?.getContext();
    context.user.tier = "Platinum";
    ldClient?.identify(context);
    setUpgradeAd(false);
  };

  return (
    <div className="flex flex-col h-screen gap-2 font-sohne bg-black overflow-y-hidden scrollbar-hide">
      {playlist ? (
        <div className="flex flex-row bg-black gap-2 mt-2">
          {sidebar && (
            <div
              className="w-3/5 xl:w-1/5 min-h-screen"
              style={{ maxHeight: "calc(100vh - 150px)" }}
            >
              <SideBar
                playlist={playlist}
                userplaylist={userplaylist}
                songsAPI={songsAPI}
                newToggleDB={newToggleDB}
              />
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
            className={`mx-auto rounded-xl pt-2 bg-ldbackground h-screen overflow-y-auto scrollbar-hide ${
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
                <div className="">
                  <div className="flex items-center justify-center pb-4">
                    {/* {upgradeAd && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      transition={{ delay: 2 }}
                      onClick={handleSubscriptionClick}
                      className="flex w-full m-2 px-4 py-3 border-2 border-gray-600 font-sohne rounded-md text-xl items-center justify-center"
                    >
                      <Sparkle className="w-8 h-8 mr-2" />
                      Special Offer! Upgrade to DJ Toggle's Platinum Plan!
                      <Sparkle className="w-8 h-8 ml-2" />
                    </motion.button>
                     )} */}
                  </div>

                  <div className="flex ml-5 font-bold items-center z-10">
                    <p className="text-2xl">Recommended Playlist</p>
                  </div>

                  <div className="relative grid gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6 mx-8 z-10">
                    {playlistAPI.map((playlist, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0, 0.71, 0.2, 1.01],
                          delay: index * 0.2,
                        }}
                        key={index}
                      >
                        <ItemCard playlist={playlist} />
                      </motion.div>
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
              <div className="ml-8 pb-8">
                {userplaylist ? (
                  <div className="relative flex-row space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {songsAPI.map((song: any, index) => (
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
                    style={{ maxHeight: "calc(100vh - 150px)" }}
                  >
                    {songsAPI.map((song: any, index: number) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0, 0.71, 0.2, 1.01],
                          delay: index * 0.2,
                        }}
                        key={song.id}
                        className="grid grid-cols-5 tracklist  w-full text-xl border-b-2 border-b-gray-600/40 py-4 hover:bg-gray-500/20"
                      >
                        <div className="">
                          {newToggleDB !== "complete" ? (
                            <Music2Icon className="h-10 w-10 ml-8" />
                          ) : (
                            <img src={song.image} className="h-10 w-10 ml-8" />
                          )}
                        </div>
                        <div className="titletext">
                          <p>{song.title}</p>
                        </div>
                        <div className=" text-lg text-gray-500">
                          <p>{song.artists}</p>
                        </div>
                        <div className="titletext">
                          <p>{song.album}</p>
                        </div>
                        <div className="timer start-end">
                          <p>{song.duration}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 h-32 w-full items-center px-4 bg-ldbackground shadow-xl justify-center grid grid-cols-3 ">
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
                  {songs[currentSongIndex].artists}
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
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className="w-2/5 xl:w-1/5 items-between flex flex-col justify-between"
              style={{ maxHeight: "calc(100vh - 150px)" }}
            >
              <img src="/images/Platinum.png" className="self-start" />
              <img src="/images/Skipper.png" className="self-end" />
            </motion.div>
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
          className="h-screen mx-auto w-full"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          <div>
            <img src="/images/ToggleTunes.png" className="h-16 my-10 mx-auto" />
          </div>
          <motion.div
            key={songs[currentSongIndex].id}
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex items-center justify-center cardgradient h-2/3 w-1/3 mx-auto rounded-xl"
            // Force the div to be a square by setting equal viewport width values to width and height
          >
            <IoIosMusicalNotes className="h-96 w-96 mx-auto" />
          </motion.div>

          <div className="absolute bottom-0 h-36 w-full items-center px-4 bg-ldbackground shadow-xl justify-center grid grid-cols-3 ">
            <div className="flex items-center ml-8">
              <div>
                <p className="subtext">{songs[currentSongIndex].title}</p>
                <p className="titletext">{songs[currentSongIndex].artists}</p>
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
