// @ts-ignore
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
import { aiModelColors, formatForJSON, wait } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import AIGeneratedPlaylistContext from "@/lib/AIGeneratedPlaylistContext";
import { colors } from "@/lib/color";
import FourAlbumArtCard from "./FourAlbumArtCard";
import { BotIcon } from "lucide-react";
import { RingLoader } from "react-spinners";
import { PlaylistInterface, AIModelInterface, SongInterface } from "@/lib/typesInterface";
import { defaultListOfCohereGeneratedSongs, defaultListOfClaudeGeneratedSongs } from "@/lib/data";
import { parseJSONArray } from "parse-json-object";
import { META, COHERE, CLAUDE } from "@/lib/constant";
import Navbar from "./Navbar";

//TODO: when you go into playlist 1 /2 or whatever, it should be specific per team1/ team 2 etc
//TODO: i think release should be a really ugly version of spotify from 2012 and then release a new version
export default function MusicApp({ teamName }: { teamName?: string }) {
  const releaseTracklistLDFlag: boolean = useFlags()["release-tracklist"];
  const releaseRecentTunesLDFlag: boolean = useFlags()["release-recent-tunes"];
  const releaseNewUsersPlaylistLDFlag: boolean = useFlags()["release-new-users-playlist"];
  const releaseAdSidebarLDFlag: boolean = useFlags()["release-ad-sidebar"];
  const migrateNewSongDBLDFlag: string = useFlags()["migrate-new-song-db"];
  const releaseAIPlaylistCreatorLDFlag: AIModelInterface =
    useFlags()["release-ai-playlist-creator"];

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

  const randomNumberGen = (array: SongInterface[] | SongInterface[][]): number => {
    return Math.floor(Math.random() * array.length); //0 to 2 index
  };

  let aiModelName: string = "";

  if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("cohere")) {
    aiModelName = "Cohere Coral";
  } else if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("meta")) {
    aiModelName = "Meta Llama";
  } else {
    aiModelName = "Anthropic Claude";
  }

  async function submitQuery(): Promise<void> {
    // const userInput = input;
    // setInput("");
    setIsLoading(true);
    // const userMessage: Message = {
    //   role: "user",
    //   content: userInput,
    //   id: uuidv4().slice(0, 4),
    // };

    let defaultListOfGeneratedSongs: SongInterface[] = [];
    let randomNumDefaultListOfGeneratedSongs = 0;

    if (aiModelName.includes(COHERE)) {
      defaultListOfGeneratedSongs =
        defaultListOfCohereGeneratedSongs[randomNumberGen(defaultListOfCohereGeneratedSongs)];
      randomNumDefaultListOfGeneratedSongs = randomNumberGen(defaultListOfCohereGeneratedSongs);
    }

    if (aiModelName.includes(CLAUDE) || aiModelName.includes(META)) {
      defaultListOfGeneratedSongs =
        defaultListOfClaudeGeneratedSongs[randomNumberGen(defaultListOfClaudeGeneratedSongs)];
      randomNumDefaultListOfGeneratedSongs = randomNumberGen(defaultListOfClaudeGeneratedSongs);
    }

    const aiPromptSonglistGenerate = `create a upbeat party pop playlist. limit to 10 songs. format it so you can use JSON.parse() within javascript without any errors. no backslash or forward slash. format it as an array of object for javascript. 
      from the album art, provide me 4 hex colors that isn't white or grey that is predominately associated with the album art.
       if two colors look similar to each other in terms of tone, then find another color that isn't similar in tone. follow this object structure: 
       {id:"Insert Number", title:"Insert Song Name", artists: "Insert Artist Name", album:"Insert Album Name", albumColor:["Insert the 4 Hex colors that isn't white or grey that is predominately associating with the album art here. 
        if two colors look similar to each other in terms of tone, then find another color that isn't similar in tone."], duration: "Insert how long the song is. Format MINUTE:SECONDS", 
        playlistName: "Insert the name of cool playlist name that this song should belong in. make it 5 words long. be creative."}. 
       Do not add any additional text before and after the array.`;

    const response = await fetch("/api/ai-songlist", {
      method: "POST",
      body: JSON.stringify(aiPromptSonglistGenerate),
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

    let aiGeneratedSonglistAnswerFormatted: SongInterface[];

    aiAnswer = formatForJSON(aiAnswer);

    try {
      console.log("aiAnswer", aiAnswer);

      if (aiModelName?.includes(COHERE)) {
        const firstFormatAnswer = aiAnswer.split("```")[1];
        // @ts-ignore
        aiGeneratedSonglistAnswerFormatted = parseJSONArray(firstFormatAnswer.split("json")[1]);
        console.log(aiGeneratedSonglistAnswerFormatted);
      } else if (aiModelName?.includes(CLAUDE)) {
        let claudeFormatAnswer: string = aiAnswer;

        if (aiAnswer.includes("partyPopPlaylist = ")) {
          claudeFormatAnswer = aiAnswer.split("partyPopPlaylist = ")[1];
        }
        // @ts-ignore
        aiGeneratedSonglistAnswerFormatted = parseJSONArray(claudeFormatAnswer);
      } else if (aiModelName?.includes(META)) {
        //TODO: META DOESN'T REALLY WORK BUT WE ARE USING DEFAULT ANSWERS FROM CLAUDE
        let metaFormatAnswer: string = aiAnswer;
        if (aiAnswer.includes("```")) {
          metaFormatAnswer = aiAnswer.split("```")[1];
          console.log(metaFormatAnswer);
        } else if (aiAnswer.includes("[{")) {
          metaFormatAnswer = aiAnswer.split("[{")[1];
          console.log(aiAnswer.split("[{"));
        }
        // @ts-ignore
        aiGeneratedSonglistAnswerFormatted = parseJSONArray(metaFormatAnswer);
        console.log(aiGeneratedSonglistAnswerFormatted);
      }
    } catch (e) {
      aiGeneratedSonglistAnswerFormatted = defaultListOfGeneratedSongs;
    }
    // @ts-ignore
    if (aiGeneratedSonglistAnswerFormatted === undefined) {
      aiGeneratedSonglistAnswerFormatted = defaultListOfGeneratedSongs;
    }

    console.log(aiGeneratedSonglistAnswerFormatted);

    const objectFormat = {
      id: uuidv4().slice(0, 4),
      title:
        aiGeneratedSonglistAnswerFormatted[randomNumberGen(aiGeneratedSonglistAnswerFormatted)]
          .playlistName,
      color:
        randomNumDefaultListOfGeneratedSongs === 0
          ? colors.emerald
          : randomNumDefaultListOfGeneratedSongs === 1
          ? colors.indigo
          : colors.orange,
      songs: aiGeneratedSonglistAnswerFormatted,
      createdBy: `${aiModelName}`,
    };
    console.log(objectFormat)
    // @ts-ignore
    setAIPlaylists((prevPlaylists): PlaylistInterface[] => {
      return [objectFormat, ...prevPlaylists];
    });
  }

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

        if ((aiModelName.includes(META) || aiModelName.includes(COHERE)) && flagFive === false) {
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
    releaseAIPlaylistCreatorLDFlag,
    migrateNewSongDBLDFlag,
  ]);

  useEffect(() => {
    // setPlaylistAPI([]);
    const fetchPlaylists = async () => {
      let addingPlaylists: PlaylistInterface[] = [];
      if (migrateNewSongDBLDFlag?.includes("complete")) {
        addingPlaylists = [...moreNewPlaylists];
      }
      // await wait(5);
      setPlaylistAPI((prevState) => [...prevState, ...addingPlaylists]);
    };
    const fetchSongs = async () => {
      let addingSongs: SongInterface[] = [];
      if (migrateNewSongDBLDFlag?.includes("complete")) {
        addingSongs = [...moreNewSongs];
      }
      // await wait(5);

      setSongsAPI((prevState) => [...prevState, ...addingSongs]);
    };
    if (migrateNewSongDBLDFlag?.includes("off") || migrateNewSongDBLDFlag === undefined) return;
    fetchPlaylists();
    fetchSongs();
  }, [migrateNewSongDBLDFlag]);

  // const handleSubscriptionClick = async () => {
  //   const context: any = ldClient?.getContext();
  //   context.user.tier = "Platinum";
  //   ldClient?.identify(context);
  //   setUpgradeAd(false);
  // };

  return (
    <Room>
      {/* 
// @ts-ignore */}
      <EventListenerComponent reloadPage={reloadPage} />
      <main className="flex flex-col gap-2 font-sohne bg-black overflow-y-visible h-screen lg:overflow-y-hidden">
        {releaseTracklistLDFlag && (
          <section className="w-full flex flex-col ">
            <Navbar />
            <section
              className={`flex flex-col sm:flex-row gap-2 ${
                releaseTracklistLDFlag &&
                releaseNewUsersPlaylistLDFlag == false &&
                releaseRecentTunesLDFlag == false &&
                "m-0 my-2"
              } ${
                releaseTracklistLDFlag &&
                releaseNewUsersPlaylistLDFlag == false &&
                releaseRecentTunesLDFlag == true &&
                "m-2"
              } ${
                releaseNewUsersPlaylistLDFlag && "m-2 "
              }  h-[calc(100vh-19rem)] sm:h-[calc(100vh-13rem)] relative overflow-y-visible`}
              id="music-app-main-cards-wrapper"
            >
              {(releaseRecentTunesLDFlag || releaseNewUsersPlaylistLDFlag) && (
                <section className="w-1/5 hidden sm:block overflow-y-auto scrollbar-hide ">
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
                className={` p-4 bg-ldbackground overflow-y-auto scrollbar-hide w-full flex flex-col gap-6
                 ${
                   releaseRecentTunesLDFlag && releaseAdSidebarLDFlag
                     ? "sm:w-3/5 rounded-md"
                     : releaseRecentTunesLDFlag || releaseNewUsersPlaylistLDFlag
                     ? "sm:w-4/5 rounded-md"
                     : "sm:w-full "
                 }`}
                id="music-app-main-center-part"
              >
                {(releaseNewUsersPlaylistLDFlag === false ||
                  releaseNewUsersPlaylistLDFlag === undefined) && (
                  <>
                    <h2 className="flex items-center gap-x-4">
                      <IoIosMusicalNotes className="w-10 h-10 text-ldcomplicatedwhite" />
                      <p className="text-2xl font-bold">Track List</p>
                      <img src="/images/tunes.png" className="ml-auto mr-5" />
                    </h2>
                    {/* TODO: need transfrom this to playlist lines - not organized and mismosh */}
                    <PlaylistTableSection playlistSongs={songsAPI} />
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

                    <h2 className="text-2xl font-bold items-center">Recommended Playlists</h2>

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

                {releaseNewUsersPlaylistLDFlag && releaseAIPlaylistCreatorLDFlag ? (
                  <section className={`flex flex-col gap-y-4 `}>
                    <h2 className="text-2xl font-bold">
                      Made For You{" "}
                      <span className="text-base text-gray-500 ml-2">
                        Powered by{" "}
                        <span
                          style={{ color: aiModelColors(releaseAIPlaylistCreatorLDFlag?.modelId) }}
                          className="font-bold"
                        >
                          {aiModelName}
                        </span>
                      </span>
                    </h2>

                    <div
                      className="relative flex-row space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
                      id="song-cards-list"
                    >
                      <button
                        onClick={() => submitQuery()}
                        className={`${isLoading ? "cursor-auto" : "cursor-pointer"}`}
                        disabled={isLoading ? true : false}
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
                          {isLoading ? (
                            <>
                              <div className="flex items-center justify-center object-cover transition-all hover:scale-105 mb-4 h-48 w-48 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-blue-700">
                                <RingLoader size={125} color={"#22c55e"} />
                              </div>
                              <div className="flex flex-col gap-y-2 items-center break-words max-w-[200px]">
                                <p className="text-lg text-center font-sohne  break-words truncate w-full">
                                  Generating...
                                </p>
                                <p className="text-base text-gray-500  text-center font-sohne font-thin truncate break-words w-full">
                                  Your AI Playlist
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center justify-center object-cover transition-all hover:scale-105 mb-4 h-48 w-48 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-blue-700">
                                <BotIcon className="h-24 w-24 text-green-500" />
                              </div>
                              <div className="flex flex-col gap-y-2 items-center align-center break-words  max-w-[180px]">
                                <p className="text-lg text-center font-sohne  break-words  w-full">
                                  Generate Your Playlist
                                </p>
                                <p className="text-base text-gray-500  text-center font-sohne font-thin truncate break-words w-full">
                                  Picked by your own AI DJ
                                </p>
                              </div>
                            </>
                          )}
                        </motion.div>
                      </button>

                      {aiPlaylists.map((playlist: PlaylistInterface) => {
                        return (
                          <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
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
                              <div className="object-cover transition-all hover:scale-105 h-48 w-48 mb-4 rounded-md grid grid-cols-2 grid-rows-2">
                                <FourAlbumArtCard playlist={playlist} />
                              </div>
                              <div className="flex flex-col gap-y-2 items-center break-words max-w-[180px]">
                                <p className="text-lg text-center font-sohne  break-words truncate w-full">
                                  {playlist.title}
                                </p>
                                <p className="text-base text-gray-500  text-center font-sohne font-thin truncate break-words w-full">
                                  Created by:{" "}
                                  <span
                                    style={{
                                      color: aiModelColors(playlist.createdBy),
                                      fontWeight: "900",
                                    }}
                                    className=""
                                  >
                                    {playlist.createdBy}
                                  </span>
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ) : null}

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
                          {migrateNewSongDBLDFlag?.includes("complete") ? (
                            <img
                              className="object-cover transition-all hover:scale-105 h-48 w-48 mb-4"
                              alt={song.title}
                              src={song.image}
                            />
                          ) : (
                            <IoIosMusicalNotes className="object-cover transition-all hover:scale-105 h-48 w-48 mb-4 text-ldcomplicatedwhite" />
                          )}
                          <div className="flex flex-col gap-y-2">
                            <p className="text-lg text-center font-sohne ">{song.title}</p>
                            <p className="text-base text-gray-500  text-center font-sohne font-thin">
                              Created by: User
                            </p>
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

        {(releaseTracklistLDFlag === false || releaseTracklistLDFlag === undefined) && (
          <SimplePlayerScreen />
        )}
      </main>
    </Room>
  );
}
// @ts-ignore
const EventListenerComponent = memo(function EventListenerComponent({
  // @ts-ignore
  reloadPage,
}) {
  console.log("Event listener online");
  useEventListener(({ event, user, connectionId }) => {
    async function resetFlagSteps(event: any) {
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
