import ItemCard from "@/components/ItemCard";
import SideBar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useFlags } from "launchdarkly-react-client-sdk";
import { memo, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { IoIosMusicalNotes } from "react-icons/io";
import { useBroadcastEvent, useEventListener } from "../liveblocks.config";
import { Room } from "./room";
import SimplePlayerScreen from "./SimplePlayerScreen";
import MusicPlayingBar from "./MusicPlayingBar";
import PlaylistTableSection from "./PlaylistTableSection";
import AdSection from "./AdSection";
import { playlists, moreNewPlaylists, moreNewSongs, songs } from "@/lib/data";
import { wait } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import AIGeneratedPlaylistContext from "@/lib/AIGeneratedPlaylistContext";
import { colors } from "@/lib/color";

import { PulseLoader } from "react-spinners";
import { PlaylistInterface } from "@/lib/typesInterface";

//TODO: when you go into playlist 1 /2 or whatever, it should be specific per team1/ team 2 etc
//TODO: i think release should be a really ugly version of spotify from 2012 and then release a new version
export default function MusicApp({ teamName }: { teamName: string }) {
  const releaseTracklistLDFlag: boolean = useFlags()["release-tracklist"];
  const releaseRecentTunesLDFlag: boolean = useFlags()["release-recent-tunes"];
  const releaseNewUsersPlaylistLDFlag: boolean = useFlags()["release-new-users-playlist"];
  const releaseAdSidebarLDFlag: boolean = useFlags()["release-ad-sidebar"];
  const migrateNewSongDBLDFlag: string = useFlags()["migrate-new-song-db"];
  const releaseAIPlaylistCreatorLDFlag: {
    max_tokens: number;
    modelId: string;
    p: number;
    temperature: number;
  } = useFlags()["release-ai-playlist-creator"];

  const { aiPlaylists, setAIPlaylists } = useContext(AIGeneratedPlaylistContext);

  const [playlistAPI, setPlaylistAPI] = useState(playlists);
  const [songsAPI, setSongsAPI] = useState(songs);
  // const [setUpgradeAd] = useState(true);
  const [flagOne, setFlagOne] = useState(false);
  const [flagTwo, setFlagTwo] = useState(false);
  const [flagThree, setFlagThree] = useState(false);
  const [flagFour, setFlagFour] = useState(false);
  const [flagFive, setFlagFive] = useState(false);
  // const [input, setInput] = useState("");
  // const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const handleInputChange = (e: any): void => {
  //   setInput(e.target.value);
  // };

  async function submitQuery(): Promise<void> {
    // const userInput = input;
    // setInput("");
    setIsLoading(true);
    // const userMessage: Message = {
    //   role: "user",
    //   content: userInput,
    //   id: uuidv4().slice(0, 4),
    // };

    const y = ` create a upbeat party pop playlist from 2020s. limit to 10 songs. avoid songs, album name, and artist name with \& and non alphabet letters within the name.  format it as an array of object for javascript. 
      from the album art, provide me 4 hex colors that isn't white or grey that is predominately associated with the album art.
       if two colors look similar to each other in terms of tone, then find another color that isn't similar in tone. follow this object structure: 
       {"id":"Insert Number", "title":"Insert Song Name", "artists": "Insert Artist Name", "album":"Insert Album Name", "albumColor":["Insert the 4 Hex colors that isn't white or grey that is predominately associating with the album art here. 
        if two colors look similar to each other in terms of tone, then find another color that isn't similar in tone."], duration: "Insert how long the song is"}. 
       Do not add any additional text before and after the array.`;

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(y),
    });

    const data: {
      generation: string;
      generations: [{ text: string }];
      completion: string;
      stop: string;
      type: string;
      generation_token_count: number;
      prompt_token_count: number;
      prompt: string;
    } = await response.json();
    setIsLoading(false);
    let aiAnswer: string;

    if (data?.generation) {
      aiAnswer = data?.generation; //llama
    } else if (data?.generations?.length > 0) {
      aiAnswer = data?.generations[0]?.text; //cohere
    } else {
      aiAnswer = data?.completion; //claude
    }
    let aiPlaylistAnswerFormatted;
    try {
      console.log("aiAnswer", aiAnswer);
      const firstFormatAnswer = aiAnswer.split("```")[1];
      console.log("firstFormatAnswer", firstFormatAnswer);
      aiPlaylistAnswerFormatted = JSON?.parse(firstFormatAnswer.split("json")[1]);
    } catch (e) {
      aiPlaylistAnswerFormatted = [
        {
          id: "1",
          title: "Dynasty",
          artists: "San Holo",
          album: "Stay Vibrant",
          albumColor: ["#EE1C2B", "#03DAC6", "#F2A05A", "#FC5E5C"],
          duration: "3:40",
        },
        {
          id: "2",
          title: "All Of The Girls You Loved Before",
          artists: "Taylor Swift",
          album: "Fearless (Taylor's Version)",
          albumColor: ["#7B16FF", "#7BFF16", "#5E00C3", "#FF2D55"],
          duration: "3:15",
        },
        {
          id: "3",
          title: "Leave the Door Open",
          artists: "Bruno Mars, Anderson .Paak & Silk Sonic",
          album: "An Evening With Silk Sonic",
          albumColor: ["#5C8AA3", "#5C50A3", "#3B3984", "#A85C8A"],
          duration: "3:27",
        },
        {
          id: "4",
          title: "Daydreaming",
          artists: "Harry Styles",
          album: "Fine Line",
          albumColor: ["#7B3E97", "#1A237E", "#D6643F", "#9B80FF"],
          duration: "4:05",
        },
        {
          id: "5",
          title: "All Eyes on Me",
          artists: "BTS",
          album: "Map of the Soul: 7",
          albumColor: ["#2E5894", "#2E-5894", "#25384D", "#7B80BD"],
          duration: "3:11",
        },
        {
          id: "6",
          title: "Peaches",
          artists: "Justin Bieber feat. Daniel Caesar & Giveon",
          album: "Justice",
          albumColor: ["#4B1D99", "#2E8B57", "#6D4F68", "#9B4B6D"],
          duration: "3:09",
        },
        {
          id: "7",
          title: "Stay",
          artists: "The Kid Laroi & Justin Bieber",
          album: "F*CK LOVE (SAVAGE)",
          albumColor: ["#4A136B", "#2C80BA", "#A99734", "#9B3921"],
          duration: "3:32",
        },
        {
          id: "8",
          title: "Mr. Perfectly Fine",
          artists: "Pink Floyd",
          album: "The Later Years",
          albumColor: ["#A8549A", "#505C9A", "#5C2D6D", "#7B686A"],
          duration: "4:09",
        },
        {
          id: "9",
          title: "Deja vu",
          artists: "Olivia Rodrigo",
          album: "SOUR",
          albumColor: ["#7B1F71", "#1A0C5C", "#7B6A1A", "#58A5BD"],
          duration: "3:15",
        },
        {
          id: "10",
          title: "Good 4 U",
          artists: "Olivia Rodrigo",
          album: "SOUR",
          albumColor: ["#7B0A0C", "#2E4E1A", "#A2685A", "#5C80A0"],
          duration: "2:58",
        },
      ];
    }

    console.log(aiPlaylistAnswerFormatted);

    const objectFormat = {
      id: uuidv4().slice(0, 4),
      title: "Top 40s 2020s",
      color: colors.emerald,
      cover: "/images/heart.png",
      songs: aiPlaylistAnswerFormatted,
    };

    setAIPlaylists((prevPlaylists): PlaylistInterface[] => {
      return [...prevPlaylists, objectFormat];
    });
  }

  const aiModelName = (): string => {
    if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("cohere")) {
      return "Cohere Coral";
    } else if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("meta")) {
      return "Meta Llama";
    } else {
      return "Anthropic Claude";
    }
  };

  // const ldClient = useLDClient();

  // const apiURL = "/api/sb-score-add/";

  const broadcast = useBroadcastEvent();

  const router = useRouter();

  const reloadPage = async () => {
    await router.reload();
  };

  useEffect(() => {
    const triggerSteps = async () => {
      try {
        if (releaseTracklistLDFlag === true && flagOne === false) {
          broadcast({ type: teamName, complete: "stepOneComplete", value: 20 });
          // console.log("first step running");
          // await triggerStep("first step complete", "stepOneComplete");
          setFlagOne(true);
        } else {
          console.log("Step 1 not eligible for evaluation!");
        }

        if (releaseRecentTunesLDFlag === true && flagTwo === false) {
          broadcast({ type: teamName, complete: "stepTwoComplete", value: 20 });
          // console.log("second step running");
          // await triggerStep("second step complete", "stepTwoComplete");
          setFlagTwo(true);
        } else {
          console.log("Step 2 not eligible for evaluation!");
        }

        if (migrateNewSongDBLDFlag === "complete" && flagThree === false) {
          broadcast({
            type: teamName,
            complete: "stepThreeComplete",
            value: 20,
          });
          // console.log("third step running");
          // await triggerStep("third step complete", "stepThreeComplete");
          setFlagThree(true);
        } else {
          console.log("Step 3 not eligible for evaluation!");
        }

        if (releaseNewUsersPlaylistLDFlag === true && flagFour === false) {
          broadcast({
            type: teamName,
            complete: "stepFourComplete",
            value: 20,
          });
          // console.log("fourth step running");
          // await triggerStep("fourth step complete", "stepFourComplete");
          setFlagFour(true);
        } else {
          console.log("Step 4 not eligible for evaluation!");
        }

        if (releaseAdSidebarLDFlag === true && flagFive === false) {
          broadcast({
            type: teamName,
            complete: "stepFiveComplete",
            value: 20,
          });
          // console.log("fifth step running");
          // await triggerStep("fifth step complete", "stepFiveComplete");
          setFlagFive(true);
        } else {
          console.log("Step 5 not eligible for evaluation!");
        }
      } catch (err) {
        console.error(err);
      }
    };

    // const triggerStep = async (event: any, stepCompleted: any) => {
    //   const step = {
    //     event,
    //     team: {
    //       name: `${teamName}`,
    //       stepCompleted,
    //     },
    //   };
    //   const response = await fetch(`${apiURL}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(step),
    //   });

    //   await console.log(response);
    // };

    triggerSteps();
  }, [
    releaseTracklistLDFlag,
    releaseRecentTunesLDFlag,
    releaseNewUsersPlaylistLDFlag,
    releaseAdSidebarLDFlag,
    migrateNewSongDBLDFlag,
  ]);

  useEffect(() => {
    // setPlaylistAPI([]);
    const fetchPlaylists = async () => {
      // await wait(1);
      setPlaylistAPI((prevState) => [...prevState, ...moreNewPlaylists]);
    };
    const fetchSongs = async () => {
      // await wait(1);
      setSongsAPI((prevState) => [...prevState, ...moreNewSongs, ...moreNewSongs]);
    };
    if (migrateNewSongDBLDFlag.includes("off")) return;
    fetchPlaylists();
    fetchSongs();
  }, [migrateNewSongDBLDFlag]);

  // const handleSubscriptionClick = async () => {
  //   const context: any = ldClient?.getContext();
  //   context.user.tier = "Platinum";
  //   ldClient?.identify(context);
  //   setUpgradeAd(false);
  // };

  const aiModelColors = (): string => {
    if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("cohere")) {
      return "#39594D";
    } else if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("meta")) {
      return "#0668E1";
    } else {
      return "#da7756";
    }
  };

  //TODO: need to create a context to save the generated playlist

  return (
    <Room>
      <EventListenerComponent reloadPage={reloadPage} />
      <main className="flex flex-col gap-2 font-sohne bg-black overflow-y-visible h-screen lg:overflow-y-hidden">
        {releaseTracklistLDFlag && (
          <section className="w-full flex flex-col ">
            <section
              className="flex flex-col sm:flex-row gap-2 my-2 mx-2  h-[calc(100vh-19rem)] sm:h-[calc(100vh-10rem)] relative overflow-y-visible"
              id="music-app-main-cards-wrapper"
            >
              {releaseRecentTunesLDFlag && (
                <section className="w-1/5 hidden sm:block">
                  <SideBar songsAPI={songsAPI} />
                </section>
              )}

              <motion.section
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className={`rounded-md p-4 bg-ldbackground overflow-y-auto scrollbar-hide w-full flex flex-col gap-6
                 ${
                   releaseRecentTunesLDFlag && releaseAdSidebarLDFlag
                     ? "sm:w-3/5"
                     : releaseRecentTunesLDFlag
                     ? "sm:w-4/5"
                     : "sm:w-full"
                 }`}
                id="music-app-main-center-part"
              >
                {releaseNewUsersPlaylistLDFlag === false && (
                  <>
                    <h2 className="flex items-center gap-x-4">
                      <IoIosMusicalNotes className="w-10 h-10 text-ldcomplicatedwhite" />
                      <p className="text-2xl font-bold">Track List</p>
                      <img src="/images/tunes.png" className="ml-auto mr-5" />
                    </h2>
                    <PlaylistTableSection songsAPI={songsAPI} />
                  </>
                )}

                {releaseNewUsersPlaylistLDFlag && (
                  <section className="flex flex-col gap-y-4">
                    <div className="hidden items-center justify-center pb-4 ">
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

                    <h2 className="text-2xl font-bold items-center">Recommended Playlist</h2>

                    <div className="relative grid gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
                  </section>
                )}

                {true && (
                  <section className={`flex flex-col gap-y-4 `}>
                    <h2 className="text-2xl font-bold">
                      Made For You{" "}
                      <span className="text-base text-gray-500 ml-2">
                        Powered by{" "}
                        <span style={{ color: aiModelColors() }} className="font-bold">
                          {aiModelName()}
                        </span>
                      </span>
                    </h2>

                    <div
                      className="relative flex-row space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
                      id="song-cards-list"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          ease: [0, 0.71, 0.2, 1.01],
                          delay: 1 * 0.2,
                        }}
                        className="place-items-center border-white bg-ldinputback 
                            rounded-md hover:bg-gray-900/50  inline-block p-4"
                      >
                        <button onClick={() => submitQuery()}>
                          {isLoading ? (
                            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800">
                              <PulseLoader className="" />
                            </div>
                          ) : (
                            <>
                              <img
                                className="object-cover transition-all hover:scale-105 h-48 w-48 mb-4"
                                alt="astronaut"
                                src={`/images/Casette.png`}
                              />
                              <div className="flex flex-col gap-y-2">
                                <p className="text-lg text-center font-sohne ">
                                  Generate Your AI Playlist
                                </p>
                                {/* <p className="text-base text-gray-500  text-center font-sohne font-thin text-wrap w-[50%]">
                                  All kinds of music, picked by your own AI DJ.
                                </p> */}
                              </div>
                            </>
                          )}
                        </button>
                      </motion.div>

                      {aiPlaylists.map((playlist: PlaylistInterface) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.25 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.25,
                              ease: [0, 0.71, 0.2, 1.01],
                              delay: 1 * 0.2,
                            }}
                            key={playlist.id}
                            className="place-items-center border-white bg-ldinputback 
                                rounded-md hover:bg-gray-900/50  inline-block p-4"
                          >
                            <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                              <div className="object-cover transition-all hover:scale-105 h-48 w-48 mb-4 rounded-md grid grid-cols-2 grid-rows-2">
                                {playlist.songs.map((song, index) => {
                                  if (index > 3) return;
                                  let backupBGColor = "";
                                  let roundedCorner = "";

                                  if (index ===0){
                                    backupBGColor = "bg-green-500";
                                    roundedCorner = "rounded-tl-md"
                                  }

                                  if (index ===1){
                                    backupBGColor = "bg-blue-500";
                                    roundedCorner = "rounded-tr-md"
                                  }

                                  if (index ===2){
                                    backupBGColor = "bg-purple-500";
                                    roundedCorner = "rounded-bl-md"
                                  }


                                  if (index ===3){
                                    backupBGColor = "bg-yellow-500";
                                    roundedCorner = "rounded-br-md"
                                  }

                                  return (
                                    <span
                                      className={`${backupBGColor} ${roundedCorner} h-full w-full`}
                                      style={{
                                        backgroundImage: `conic-gradient(${song?.albumColor[0]}, ${song?.albumColor[1]}, ${song?.albumColor[2]}, ${song?.albumColor[3]})`,
                                      }}
                                      key={song.id}
                                    ></span>
                                  );
                                })}
                              </div>
                              <div className="flex flex-col gap-y-2">
                                <p className="text-lg text-center font-sohne ">{playlist.title}</p>
                                {/* <p className="text-base text-gray-500  text-center font-sohne font-thin text-wrap w-[50%]">
                                    All kinds of music, picked by your own AI DJ.
                                  </p> */}
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {releaseNewUsersPlaylistLDFlag && (
                  <section className={`flex flex-col gap-y-4 `}>
                    <h2 className="text-2xl  font-bold">Trending Playlists</h2>
                    <div
                      className="relative flex-row space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
                      id="song-cards-list"
                    >
                      {songsAPI.map((song: any, index) => (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.25 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.25,
                            ease: [0, 0.71, 0.2, 1.01],
                            delay: index * 0.2,
                          }}
                          key={`${song.id} ${index}`}
                          className="place-items-center border-white bg-ldinputback 
                            rounded-md hover:bg-gray-900/50  inline-block p-4"
                        >
                          <img
                            className="object-cover transition-all hover:scale-105 h-48 w-48 mb-4"
                            alt={song.title}
                            src={song.image}
                          />
                          <div className="flex flex-col gap-y-2">
                            <p className="text-lg text-center font-sohne ">{song.title}</p>
                            {/* <p className="text-base text-gray-500  text-center font-sohne font-thin">
                              {song.duration}
                            </p> */}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </motion.section>

              {releaseAdSidebarLDFlag && <AdSection />}
            </section>
            <MusicPlayingBar />
          </section>
        )}

        {releaseTracklistLDFlag === false && <SimplePlayerScreen />}
      </main>
    </Room>
  );
}

const EventListenerComponent = memo(function EventListenerComponent({ reloadPage }) {
  console.log("Event listener online");
  useEventListener(({ event, user, connectionId }) => {
    async function resetFlagSteps(event) {
      console.log(event);
      switch (event.type) {
        case "resetTimer":
          await reloadPage(); // Call reloadPage when event type is "resetTimer"
          break;
        case "reload":
          await reloadPage();
          break;
        default:
          console.log("invalid event type");
      }
    }
    resetFlagSteps(event);
  });
});
