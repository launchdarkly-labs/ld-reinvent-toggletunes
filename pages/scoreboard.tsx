import KeyboardNavigation from "@/components/KeyboardNavigation";
import { Modal } from "@/components/modal";
import { ProgressStatus } from "@/components/progress-screen";
import { Room } from "@/components/room";
import { StartModal } from "@/components/start-modal";
import { useEventListener, useStorage, useMutation } from "@/liveblocks.config";
import { setCookie } from "cookies-next";
import { memo, useEffect, useState, useContext } from "react";
import {
  RED,
  BLUE,
  PURPLE,
  GREEN,
  STEPONECOMPLETE,
  STEPTWOONECOMPLETE,
  STEPTWOCOMPLETE,
  STEPTHREECOMPLETE,
  STEPFOURONECOMPLETE,
  STEPFOURCOMPLETE,
  STEPFIVECOMPLETE,
  WINNER,
  IMAGECOLORSRCMAP,
} from "@/lib/constant";
import Timer from "@/components/Timer";
import { useTimer } from "@/lib/useTimer";
import { formatTime } from "@/lib/utils";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Scoreboard() {
  const starterCompletionProgressObject = {
    [STEPONECOMPLETE]: 0,
    [STEPTWOONECOMPLETE]: 0,
    [STEPTWOCOMPLETE]: 0,
    [STEPTHREECOMPLETE]: 0,
    [STEPFOURONECOMPLETE]: 0,
    [STEPFOURCOMPLETE]: 0,
    [STEPFIVECOMPLETE]: 0,
  };

  const [redProgress, setRedProgress] = useState<number>(0);
  const [purpleProgress, setPurpleProgress] = useState<number>(0);
  const [blueProgress, setBlueProgress] = useState<number>(0);
  const [greenProgress, setGreenProgress] = useState<number>(0);
  const [redCompletionProgress, setRedCompletionProgress] = useState(
    starterCompletionProgressObject
  );
  const [purpleCompletionProgress, setPurpleCompletionProgress] = useState<number>(
    //@ts-ignore
    starterCompletionProgressObject
  );
  const [blueCompletionProgress, setBlueCompletionProgress] = useState<number>(
    //@ts-ignore
    starterCompletionProgressObject
  );
  const [greenCompletionProgress, setGreenCompletionProgress] = useState<number>(
    //@ts-ignore
    starterCompletionProgressObject
  );

  const [winnerName, setWinnerName] = useState("");
  const [openStartModal, setOpenStartModal] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const { timeLeft, isActive, startTimer, pauseTimer, resetTimer, duration } = useTimer();
  // const layerIds = useStorage((root) => root);

  // console.log("layerIds", layerIds);
  const endGame = () => {
    const maxProgress = Math.max(greenProgress, redProgress, purpleProgress, blueProgress);
    let winners = [];
    let winnerName = "";
    if (maxProgress === blueProgress) {
      winners.push(BLUE);
    }
    if (maxProgress === redProgress) {
      winners.push(RED);
    }
    if (maxProgress === purpleProgress) {
      winners.push(PURPLE);
    } else {
      //TIE SCENARIO
      const ranNum = Math.floor(Math.random() * 3); //0 1 2
      if (ranNum === 0) {
        winners.push(BLUE);
      } else if (ranNum === 1) {
        winners.push(RED);
      } else {
        winners.push(PURPLE);
      }
    }

    // if (winners.length > 1) {
    //   winnerName = "";
    // } else {
    //   winnerName = winners[0];
    // }

    winnerName = winners[0];
    document.getElementById("timer-reset-button")?.click();
    setWinnerName(winnerName);
    setShowWinnerModal(true);
  };

  //todo: maybe change this to if all task completed for the object
  useEffect(() => {
    if (
      greenProgress >= 100 ||
      redProgress >= 100 ||
      purpleProgress >= 100 ||
      blueProgress >= 100
    ) {
      endGame();
    }
  }, [greenProgress, redProgress, blueProgress, purpleProgress, winnerName]);
  // const addAnimal = useMutation(({ storage }) => {
  //   const animals = storage.get("animals");

  //   // LiveList<["Fido"]>
  //   console.log(animals);

  //   animals.push("Felix");

  //   // LiveList<["Fido", "Felix"]>
  //   console.log(animals);
  // });

  const router = useRouter();

  const reloadPage = async () => {
    await router.reload();
  };

  return (
    <>
      <EventListenerComponent
        setGreenProgress={setGreenProgress}
        setRedProgress={setRedProgress}
        setPurpleProgress={setPurpleProgress}
        setBlueProgress={setBlueProgress}
        setOpenStartModal={setOpenStartModal}
        setAnimationStarted={setAnimationStarted}
        setWinnerName={setWinnerName}
        setGreenCompletionProgress={setGreenCompletionProgress}
        setRedCompletionProgress={setRedCompletionProgress}
        setPurpleCompletionProgress={setPurpleCompletionProgress}
        setBlueCompletionProgress={setBlueCompletionProgress}
        greenCompletionProgress={greenCompletionProgress}
        redProgress={redProgress}
        greenProgress={greenProgress}
        blueProgress={blueProgress}
        purpleProgress={purpleProgress}
        //@ts-ignore
        redCompletionProgress={redCompletionProgress}
        purpleCompletionProgress={purpleCompletionProgress}
        blueCompletionProgress={blueCompletionProgress}
        starterCompletionProgressObject={starterCompletionProgressObject}
        startTimer={startTimer}
        resetTimer={resetTimer}
        timeLeft={timeLeft}
        duration={duration}
        reloadPage={reloadPage}
        setShowWinnerModal={setShowWinnerModal}
        endGame={endGame}
        // addAnimal={addAnimal}
      />
      <Head>
        <link rel="preload" href={IMAGECOLORSRCMAP[RED]} as="image" />
        <link rel="preload" href={IMAGECOLORSRCMAP[BLUE]} as="image" />
        <link rel="preload" href={IMAGECOLORSRCMAP[PURPLE]} as="image" />
        <link rel="preload" href={"/images/ld-logo.svg"} as="image" />
      </Head>
      <main className="h-screen bg-black">
        <div
          className="flex flex-col bg-[#191919] mx-auto max-w-8xl h-screen gap-y-10
        items-center justify-center py-4 px-10"
          id="scoreboard-main"
        >
          <img src="/images/ld-logo.svg" alt="ld-logo" className="h-16 xl:h-20 z-10" />
          <img
            src="/images/scoreboard-right/ellipse-1616.svg"
            alt="purple"
            className="absolute right-0 top-0"
          />
          <img
            src="/images/scoreboard-right/star-13.svg"
            alt="right-star-1"
            className="absolute bg-transparent right-[4rem] top-[-.6rem] w-[5rem] h-[5rem] brightness-[80%]"
          />
          <img
            src="/images/scoreboard-right/star-12.svg"
            alt="right-star-2"
            className="absolute bg-transparent right-[-1rem] top-[6rem] w-[6rem] h-[6rem] brightness-[80%]"
          />
          <img
            src="/images/scoreboard-left/ellipse-1615.svg"
            alt="pink"
            className="absolute left-0 top-0"
          />
          <img
            src="/images/scoreboard-left/frame-13.svg"
            alt="left-object"
            className="absolute bg-transparent left-[-2rem] top-[-6rem] w-[15rem] h-[15rem] brightness-[100%]"
          />
          <ProgressStatus
            greenProgress={greenProgress}
            purpleProgress={purpleProgress}
            redProgress={redProgress}
            blueProgress={blueProgress}
          />

          <section
            id="scoreboard-wrapper"
            className="flex sticky 
  place-items-center border border-zinc-500 
  w-1/3 xl:w-1/6 bg-gradient-scoreboard-timer-background justify-center rounded-md"
          >
            <Timer endGame={endGame} />
          </section>
        </div>
      </main>
      {/* this modal shows the winner */}
      {showWinnerModal && (
        <Modal
          winnerName={winnerName}
          setOpenStartModal={setOpenStartModal}
          setWinnerName={setWinnerName}
        />
      )}
      <StartModal
        openStartModal={openStartModal}
        setOpenStartModal={setOpenStartModal}
        animationStarted={animationStarted}
        setAnimationStarted={setAnimationStarted}
      />
    </>
  );
}

const EventListenerComponent = memo(function EventListenerComponent({
  setGreenProgress,
  setRedProgress,
  setBlueProgress,
  setPurpleProgress,
  setOpenStartModal,
  setAnimationStarted,
  setWinnerName,
  setGreenCompletionProgress,
  setRedCompletionProgress,
  setPurpleCompletionProgress,
  setBlueCompletionProgress,
  greenCompletionProgress,
  redCompletionProgress,
  purpleCompletionProgress,
  blueCompletionProgress,
  starterCompletionProgressObject,
  duration,
  reloadPage,
  setShowWinnerModal,
  redProgress,
  greenProgress,
  blueProgress,
  purpleProgress,
  endGame,
}: // addAnimal
{
  setGreenProgress: any;
  setRedProgress: any;
  setBlueProgress: any;
  setPurpleProgress: any;
  setOpenStartModal: any;
  setAnimationStarted: any;
  setWinnerName: any;
  setGreenCompletionProgress: any;
  setRedCompletionProgress: any;
  setPurpleCompletionProgress: any;
  setBlueCompletionProgress: any;
  greenCompletionProgress: number;
  redCompletionProgress: number;
  purpleCompletionProgress: number;
  blueCompletionProgress: number;
  starterCompletionProgressObject: any;
  duration: number;
  reloadPage: any;
  setShowWinnerModal: any;
  redProgress: number;
  greenProgress: number;
  blueProgress: number;
  purpleProgress: number;
  endGame: any;
}) {
  console.log("Event listener online");

  useEventListener(({ event, user, connectionId }) => {
    console.log(user);
    console.log(connectionId);
    console.log(event);
    async function scoreRequest(event: any) {
      switch (event.type) {
        case GREEN:
          //@ts-ignore
          if (greenCompletionProgress[event.complete] === 0) {
            console.log("green score");
            setGreenProgress((prevProgress: number) => prevProgress + event.score);
            //@ts-ignore
            setGreenCompletionProgress({ ...greenCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
          }

          break;
        case RED:
          //@ts-ignore
          if (redCompletionProgress[event.complete] === 0) {
            console.log("red score");
            setRedProgress((prevProgress: number) => prevProgress + event.score);
            //@ts-ignore
            setRedCompletionProgress({ ...redCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
          }

          break;
        case PURPLE:
          //@ts-ignore
          if (purpleCompletionProgress[event.complete] === 0) {
            console.log("purple score");
            setPurpleProgress((prevProgress: number) => prevProgress + event.score);
            //@ts-ignore
            setPurpleCompletionProgress({ ...purpleCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
          }

          break;
        case BLUE:
          //@ts-ignore
          if (blueCompletionProgress[event.complete] === 0) {
            console.log("blue score");
            setBlueProgress((prevProgress: number) => prevProgress + event.score);
            //@ts-ignore
            setBlueCompletionProgress({ ...blueCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
          }

          break;
        case "startTimer":
          console.log("starting timer");

          const updatedTimeLeft = document.getElementById("timer-time")?.innerHTML;
          // @ts-ignore
          if (updatedTimeLeft < formatTime(duration)) {
            document.getElementById("timer-play-button")?.click();
          }

          if (updatedTimeLeft == formatTime(duration)) {
            setAnimationStarted(true);
          }

          break;
        case "stopTimer":
          console.log("stopping timer");
          document.getElementById("timer-pause-button")?.click();
          break;
        case `${RED}${WINNER}`:
          setWinnerName(RED);
          setShowWinnerModal(true);
          break;
        case `${BLUE}${WINNER}`:
          setWinnerName(BLUE);
          setShowWinnerModal(true);
          break;
        case `${PURPLE}${WINNER}`:
          setWinnerName(PURPLE);
          setShowWinnerModal(true);
          break;
        case `${RED}ManualPoints`:
          setRedProgress((prevProgress: number) => prevProgress + event.score);
          if (redProgress >= 100) {
            endGame();
          }
          break;
        case `${BLUE}ManualPoints`:
          setBlueProgress((prevProgress: number) => prevProgress + event.score);
          if (blueProgress >= 100) {
            endGame();
          }
          break;
        case `${PURPLE}ManualPoints`:
          setPurpleProgress((prevProgress: number) => prevProgress + event.score);
          if (purpleProgress >= 100) {
            endGame();
          }
          break;
        case "resetTimer":
          console.log("resetting scoreboard");
          document.getElementById("timer-reset-button")?.click();
          setOpenStartModal(true);
          setWinnerName("");
          setGreenProgress(0);
          setRedProgress(0);
          setBlueProgress(0);
          setPurpleProgress(0);
          setGreenCompletionProgress(starterCompletionProgressObject);
          setRedCompletionProgress(starterCompletionProgressObject);
          setPurpleCompletionProgress(starterCompletionProgressObject);
          setBlueCompletionProgress(starterCompletionProgressObject);
          reloadPage();
          break;
        default:
          console.log(event.type);
          console.log("Invalid event type");
      }
    }
    scoreRequest(event);
  });

  // This component doesn't render anything
  return null;
});
