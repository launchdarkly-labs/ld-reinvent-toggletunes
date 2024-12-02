// @ts-ignore
import ItemCard from "@/components/ItemCard";
import SideBar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useFlags } from "launchdarkly-react-client-sdk";
import { memo, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { IoIosMusicalNotes } from "react-icons/io";
import {
  useBroadcastEvent,
  useEventListener,
  useHistory,
  useStatus,
  useUser,
  useStorage,
  useThreads,
  useSelf,
  useLostConnectionListener,
} from "../liveblocks.config";

import { Room } from "./room";
import SimplePlayerScreen from "./SimplePlayerScreen";
import MusicPlayingBar from "./MusicPlayingBar";
import PlaylistTableSection from "./PlaylistTableSection";
import AdSection from "./AdSection";
import { playlists, moreNewPlaylists, moreNewSongs, songs } from "@/lib/data";
import { aiModelColors, formatForJSON } from "@/lib/utils";
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
import {
  META,
  COHERE,
  CLAUDE,
  LDPROJECTKEYSVALUEOBJECTS,
  STEPONECOMPLETE,
  STEPTWOONECOMPLETE,
  STEPTWOCOMPLETE,
  STEPTHREECOMPLETE,
  STEPFOURONECOMPLETE,
  STEPFOURCOMPLETE,
  STEPFIVECOMPLETE,
  PERSONA_ROLE_DEVELOPER,
  WINNER,
} from "@/lib/constant";
import Navbar from "./Navbar";
import LoginContext from "@/lib/LoginContext";
import { Modal } from "./modal";
import { LostConnectionModal } from "./LostConnectionModal";

//TODO: when you go into playlist 1 /2 or whatever, it should be specific per team1/ team 2 etc
//TODO: i think release should be a really ugly version of spotify from 2012 and then release a new version
export default function MusicApp({ teamColor, teamName }: { teamColor: string; teamName: string }) {
  const releaseTracklistLDFlag: boolean = useFlags()["release-tracklist"];
  const releaseSavedPlaylistsSidebarLDFlag: boolean = useFlags()["release-saved-playlists-sidebar"];
  const releaseNewUsersPlaylistLDFlag: boolean = useFlags()["release-new-users-playlist"];
  const releaseAdSidebarLDFlag: boolean = useFlags()["release-new-ad-sidebar"];
  // const migrateNewSongDBLDFlag: string = useFlags()["migrate-new-song-db"];
  const migrateNewSongDBLDFlag: string = "complete";
  const releaseAIPlaylistCreatorLDFlag: AIModelInterface =
    useFlags()["release-ai-playlist-creator"];
  const { aiPlaylists, setAIPlaylists } = useContext(AIGeneratedPlaylistContext);

  // Check for `error` and `isLoading` before `threads` is defined

  const [playlistAPI, setPlaylistAPI] = useState(playlists);
  const [songsAPI, setSongsAPI] = useState(songs);
  // const [setUpgradeAd] = useState(true);
  const [flagOne, setFlagOne] = useState(false);
  const [flagTwoOne, setFlagTwoOne] = useState(false);
  const [flagTwo, setFlagTwo] = useState(false);
  const [flagThree, setFlagThree] = useState(false);
  const [flagFourOne, setFlagFourOne] = useState(false);
  const [flagFour, setFlagFour] = useState(false);
  const [flagFive, setFlagFive] = useState(false);
  const [totalPointAccumulation, setTotalPointAccumulation] = useState(0);
  const [isLoadingApp, setIsLoadingApp] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [releaseReleaseGuardianButton, setReleaseReleaseGuardianButton] = useState(false);
  const [releaseAdSidebarManually, setReleaseAdSidebarManually] = useState(false);
  const [countNumReleaseGuardianAdSidebar, setCountNumReleaseGuardianAdSidebar] = useState(0);
  const [showLostConnectionModal, setShowLostConnectionModal] = useState(false);
  const layerIds = useStorage((root) => root);
  // @ts-ignore
  // const layerIds2 = useStorage((root) => root.totalPoints);
  console.log("layerIds", layerIds);
  // console.log("layerIds2", layerIds2);
  const API_KEY: string = process.env.NEXT_PUBLIC_LD_API_KEY as string;

  const { userObject } = useContext(LoginContext);

  useLostConnectionListener((event) => {
    switch (event) {
      case "lost":
        setShowLostConnectionModal(true);
        break;

      case "restored":
        setShowLostConnectionModal(false);
        break;

      case "failed":
        alert("Could not restore the connection");
        setShowLostConnectionModal(true);
        break;
    }
  });

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
  } else if (releaseAIPlaylistCreatorLDFlag?.modelId?.includes("claude")) {
    aiModelName = "Anthropic Claude";
  }

  async function submitAIQuery(): Promise<void> {
    // const userInput = input;
    // setInput("");
    setIsLoadingApp(true);
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

    setIsLoadingApp(false);
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
    console.log(objectFormat);
    // @ts-ignore
    setAIPlaylists((prevPlaylists): PlaylistInterface[] => {
      return [objectFormat, ...prevPlaylists];
    });
  }

  async function submitReleaseGuardianQuery(): Promise<void> {
    // @ts-ignore
    const projectKey: string = LDPROJECTKEYSVALUEOBJECTS[teamName];

    const environmentKey = "test";
    const flag_key = "release-new-ad-sidebar";
    setIsLoadingApp(true);
    const response = await fetch(
      `https://app.launchdarkly.com/api/v2/projects/${projectKey}/flags/${flag_key}/measured-rollouts?filter=environmentKey:${environmentKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          "ld-api-version": "beta",
        },
      }
    );
    const data = await response.json();
    console.log("release guardian data", data);
    setIsLoadingApp(false);

    try {
      if (countNumReleaseGuardianAdSidebar === 0) {
        //get count of number of release guardian attached to ad sidebar flag
        setCountNumReleaseGuardianAdSidebar(data.items.length);
      } else if (data.items.length > countNumReleaseGuardianAdSidebar) {
        setReleaseAdSidebarManually(true);
      }
    } catch (e) {
      throw new Error(`Cannot find release guardian`);
    }
  }

  useEffect(() => {
    if (router.pathname !== "/") {
      submitReleaseGuardianQuery();
    }
  }, []);

  const broadcast = useBroadcastEvent();
  //TODO: this some reason causes eveyrthing ot load to make sure livelbocks works?
  // const animals = useStorage((root) => root);
  // console.log(animals);

  const router = useRouter();

  const reloadPage = async () => {
    await router.reload();
  };

  useEffect(() => {
    const triggerSteps = async () => {
      try {
        if (releaseTracklistLDFlag === true && flagOne === false) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 20);
          broadcast({
            type: teamColor,
            complete: STEPONECOMPLETE,
            score: 20,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagOne(true);
        } else {
          console.log("Step 1 not eligible for evaluation!");
        }

        if (releaseSavedPlaylistsSidebarLDFlag === true && flagTwoOne === false) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 10);
          broadcast({
            type: teamColor,
            complete: STEPTWOONECOMPLETE,
            score: 10,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagTwoOne(true);
          // await triggerStep("second step complete", "stepTwoComplete");
        } else {
          console.log("Step 2.1 not eligible for evaluation!");
        }

        //turn the flag off once you turn back on
        if (
          flagTwoOne === true &&
          releaseSavedPlaylistsSidebarLDFlag === false &&
          flagTwo === false
        ) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 10);
          broadcast({
            type: teamColor,
            complete: STEPTWOCOMPLETE,
            score: 10,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagTwo(true);
          // await triggerStep("second step complete", "stepTwoComplete");
        } else {
          console.log("Step 2 not eligible for evaluation!");
        }

        if (
          releaseNewUsersPlaylistLDFlag === true &&
          flagThree === false &&
          userObject.personarole === PERSONA_ROLE_DEVELOPER
        ) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 20);
          broadcast({
            type: teamColor,
            complete: STEPTHREECOMPLETE,
            score: 20,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagThree(true);
          // await triggerStep("fourth step complete", "stepFourComplete");
        } else {
          console.log("Step 3 not eligible for evaluation!");
        }

        if (aiModelName.includes(CLAUDE) && flagFourOne === false) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 10);
          broadcast({
            type: teamColor,
            complete: STEPFOURONECOMPLETE,
            score: 10,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagFourOne(true);
        } else {
          console.log("Step 4.1 not eligible for evaluation!");
        }

        if (
          (aiModelName.includes(META) || aiModelName.includes(COHERE)) &&
          aiPlaylists.length >= 1 &&
          flagFour === false &&
          flagFourOne === true
        ) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 10);
          broadcast({
            type: teamColor,
            complete: STEPFOURCOMPLETE,
            score: 10,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagFour(true);

          setReleaseReleaseGuardianButton(true);
        } else {
          console.log("Step 4 not eligible for evaluation!");
        }

        if (
          (releaseAdSidebarLDFlag || releaseAdSidebarManually) &&
          releaseReleaseGuardianButton === true &&
          flagFive === false
        ) {
          setTotalPointAccumulation((prevPoints) => prevPoints + 20);
          broadcast({
            type: teamColor,
            complete: STEPFIVECOMPLETE,
            score: 20,
            totalPointAccumulation: totalPointAccumulation,
          });
          setFlagFive(true);
        } else {
          console.log("Step 5 not eligible for evaluation!");
        }

        if (flagFive === true && totalPointAccumulation >= 100) {
          broadcast({ type: `${teamColor}${WINNER}` });
          setShowWinnerModal(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    triggerSteps();
  }, [
    releaseTracklistLDFlag,
    releaseSavedPlaylistsSidebarLDFlag,
    releaseNewUsersPlaylistLDFlag,
    releaseAIPlaylistCreatorLDFlag,
    releaseAdSidebarLDFlag,
    releaseAdSidebarManually,
    aiPlaylists,
    totalPointAccumulation,
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
            <Navbar
              releaseReleaseGuardianButton={releaseReleaseGuardianButton}
              submitReleaseGuardianQuery={submitReleaseGuardianQuery}
              totalPointAccumulation={totalPointAccumulation}
            />
            <section
              className={`flex flex-col sm:flex-row gap-2 ${
                releaseTracklistLDFlag &&
                releaseNewUsersPlaylistLDFlag == false &&
                releaseSavedPlaylistsSidebarLDFlag == false &&
                "m-0 my-2"
              } ${
                releaseTracklistLDFlag &&
                releaseNewUsersPlaylistLDFlag == false &&
                releaseSavedPlaylistsSidebarLDFlag == true &&
                "m-2"
              } ${
                releaseNewUsersPlaylistLDFlag && "m-2 "
              }  h-[calc(100vh-19rem)] sm:h-[calc(100vh-13rem)] relative overflow-y-visible`}
              id="music-app-main-cards-wrapper"
            >
              {(releaseSavedPlaylistsSidebarLDFlag || releaseNewUsersPlaylistLDFlag) && (
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
                   releaseSavedPlaylistsSidebarLDFlag &&
                   (releaseAdSidebarLDFlag || releaseAdSidebarManually) &&
                   releaseReleaseGuardianButton
                     ? "sm:w-3/5 rounded-md"
                     : releaseSavedPlaylistsSidebarLDFlag || releaseNewUsersPlaylistLDFlag
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
                      {aiModelName !== "" && (
                        <span className="text-base text-gray-500 ml-2">
                          Powered by{" "}
                          <span
                            style={{
                              color: aiModelColors(releaseAIPlaylistCreatorLDFlag?.modelId),
                            }}
                            className="font-bold"
                          >
                            {aiModelName}
                          </span>{" "}
                          with <span className="text-amazonColor"> Amazon Bedrock</span>
                        </span>
                      )}
                    </h2>

                    <div
                      className="relative flex-row space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
                      id="song-cards-list"
                    >
                      <button
                        onClick={() => submitAIQuery()}
                        className={`${
                          isLoadingApp || releaseAIPlaylistCreatorLDFlag.modelId === ""
                            ? "cursor-auto"
                            : "cursor-pointer"
                        }`}
                        disabled={
                          isLoadingApp || releaseAIPlaylistCreatorLDFlag.modelId === ""
                            ? true
                            : false
                        }
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.25 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.25,
                            ease: [0, 0.71, 0.2, 1.01],
                            delay: 1 * 0.2,
                          }}
                          className={`place-items-center border-white bg-ldinputback 
                            rounded-md hover:bg-gray-900/50  inline-block p-4  ${
                              releaseAIPlaylistCreatorLDFlag.modelId === "" && "brightness-[25%]"
                            }`}
                        >
                          {isLoadingApp ? (
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
                              <div
                                className="flex items-center justify-center object-cover transition-all hover:scale-105 mb-4 h-48 w-48 rounded-lg px-3 py-2 text-sm 
                              bg-blue-700"
                              >
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

              {(releaseAdSidebarLDFlag || releaseAdSidebarManually) &&
                releaseReleaseGuardianButton && <AdSection />}
            </section>
            <MusicPlayingBar />
          </section>
        )}

        {(releaseTracklistLDFlag === false || releaseTracklistLDFlag === undefined) && (
          <SimplePlayerScreen />
        )}
      </main>
      {showWinnerModal ? <Modal winnerName={teamColor} /> : null}
      {showLostConnectionModal ? (
        <LostConnectionModal showLostConnectionModal={showLostConnectionModal} />
      ) : null}
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
