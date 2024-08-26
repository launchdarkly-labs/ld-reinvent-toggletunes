import ItemCard from "@/components/ItemCard";
import SideBar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useFlags } from "launchdarkly-react-client-sdk";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosMusicalNotes } from "react-icons/io";
import { useBroadcastEvent, useEventListener } from "../liveblocks.config";
import { Room } from "./room";
import SimplePlayerScreen from "./SimplePlayerScreen";
import MusicPlayingBar from "./MusicPlayingBar";
import PlaylistTableSection from "./PlaylistTableSection";
import AdSection from "./AdSection";
import { playlists, songs } from "@/lib/data";

//TODO: when you go into playlist 1 /2 or whatever, it should be specific per team1/ team 2 etc
//TODO: i think release should be a really ugly version of spotify from 2012 and then release a new version
export default function MusicApp({ teamName }: { teamName: string }) {
  const {
    tracklist = true,
    recenttunes = false,
    userplaylist = false,
    platinumtier = false,
    newtoggledb = "complete",
  }: {
    tracklist: boolean;
    recenttunes: boolean;
    userplaylist: boolean;
    platinumtier: boolean;
    newtoggledb: string;
  } = useFlags();

  const [playlistAPI, setPlaylistAPI] = useState([...playlists, ...playlists]);
  const [songsAPI, setSongsAPI] = useState([...songs, ...songs, ...songs]);
  // const [setUpgradeAd] = useState(true);
  const [flagOne, setFlagOne] = useState(false);
  const [flagTwo, setFlagTwo] = useState(false);
  const [flagThree, setFlagThree] = useState(false);
  const [flagFour, setFlagFour] = useState(false);
  const [flagFive, setFlagFive] = useState(false);

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
        if (tracklist === true && flagOne === false) {
          broadcast({ type: teamName, complete: "stepOneComplete", value: 20 });
          // console.log("first step running");
          // await triggerStep("first step complete", "stepOneComplete");
          setFlagOne(true);
        } else {
          console.log("Step 1 not eligible for evaluation!");
        }

        if (recenttunes === true && flagTwo === false) {
          broadcast({ type: teamName, complete: "stepTwoComplete", value: 20 });
          // console.log("second step running");
          // await triggerStep("second step complete", "stepTwoComplete");
          setFlagTwo(true);
        } else {
          console.log("Step 2 not eligible for evaluation!");
        }

        if (newtoggledb === "complete" && flagThree === false) {
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

        if (userplaylist === true && flagFour === false) {
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

        if (platinumtier === true && flagFive === false) {
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
  }, [tracklist, recenttunes, userplaylist, platinumtier, newtoggledb]);

  useEffect(() => {
    // setPlaylistAPI([]);
    const fetchPlaylists = async () => {
      try {
        const subroute = window.location.pathname.split("/")[1];
        const response = await fetch(`/api/playlists/?team=${subroute}`);
        const data = await response.json();
        await setPlaylistAPI(playlists);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSongs = async () => {
      try {
        const subroute = window.location.pathname.split("/")[1];
        const response = await fetch(`/api/songs/?team=${subroute}`);
        const data = await response.json();
        await setSongsAPI(songs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylists();
    fetchSongs();
  }, [newtoggledb]);

  // const handleSubscriptionClick = async () => {
  //   const context: any = ldClient?.getContext();
  //   context.user.tier = "Platinum";
  //   ldClient?.identify(context);
  //   setUpgradeAd(false);
  // };

  return (
    <Room>
      <EventListenerComponent reloadPage={reloadPage} />
      <main className="flex flex-col gap-2 font-sohne bg-black overflow-y-visible h-screen lg:overflow-y-hidden">
        {tracklist && (
          <section className="w-full flex flex-col ">
            <section
              className="flex flex-col sm:flex-row gap-2 my-2 mx-2  relative h-full overflow-y-visible"
              id="music-app-main-cards-wrapper"
            >
              {recenttunes && (
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
                 h-[calc(100vh-19rem)] sm:h-[calc(100vh-10rem)] ${
                   recenttunes && platinumtier ? "sm:w-3/5" : recenttunes ? "sm:w-4/5" : "sm:w-full"
                 }`}
                id="music-app-main-center-part"
              >
                {userplaylist === false && (
                  <>
                    <h2 className="flex items-center gap-x-4">
                      <IoIosMusicalNotes className="w-10 h-10 text-ldcomplicatedwhite" />
                      <p className="text-2xl font-bold">Track List</p>
                    </h2>
                    <PlaylistTableSection songsAPI={songsAPI} />
                  </>
                )}

                {/* userplaylist === false && "h-[calc(100vh-21rem)] sm:h-[calc(100vh-14rem)]" */}

                {!recenttunes && (
                  <header className="">
                    <img src="/images/tunes.png" className="ml-auto mr-5" />
                  </header>
                )}

                {userplaylist && (
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

                {userplaylist && (
                  <section className={`flex flex-col gap-y-4 `}>
                    <h2 className="text-2xl  font-bold">Trending Hits</h2>
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
                            alt="astronaut"
                            src={song.image}
                          />
                          <div className="flex flex-col gap-y-2">
                            <p className="text-lg text-center font-sohne ">{song.title}</p>
                            <p className="text-base text-gray-500  text-center font-sohne font-thin">
                              {song.duration}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </motion.section>

              {platinumtier && <AdSection />}
            </section>
            <MusicPlayingBar />
          </section>
        )}

        {tracklist === false && <SimplePlayerScreen />}
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
