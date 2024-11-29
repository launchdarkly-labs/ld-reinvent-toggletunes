//@ts-nocheck
import KeyboardNavigation from "@/components/KeyboardNavigation";
import { Modal } from "@/components/modal";
import { ProgressStatus } from "@/components/progress-screen";
import { Room } from "@/components/room";
import { StartModal } from "@/components/start-modal";
import { useEventListener, useStorage, useHistory } from "@/liveblocks.config";
import { setCookie } from "cookies-next";
import { memo, useEffect, useState } from "react";
import {
  RED,
  BLUE,
  PURPLE,
  GREEN,
  STEPONECOMPLETE,
  STEPTWOCOMPLETE,
  STEPTHREECOMPLETE,
  STEPFOURCOMPLETE,
  STEPFIVECOMPLETE,
} from "@/lib/constant";
import Timer from "@/components/Timer";
import { useTimer } from "@/lib/useTimer";

const defaultTimer = 900000; //15 min
export default function Scoreboard() {
  const starterCompletionProgressObject = {
    [STEPONECOMPLETE]: 0,
    [STEPTWOCOMPLETE]: 0,
    [STEPTHREECOMPLETE]: 0,
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
    starterCompletionProgressObject
  );
  const [blueCompletionProgress, setBlueCompletionProgress] = useState<number>(
    starterCompletionProgressObject
  );
  const [greenCompletionProgress, setGreenCompletionProgress] = useState<number>(
    starterCompletionProgressObject
  );
  const [winnerState, setWinnerState] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [timer, setTimer] = useState(defaultTimer);
  const [openStartModal, setOpenStartModal] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  const { timeLeft, isActive, startTimer, pauseTimer, resetTimer, duration } = useTimer();

  // async function configUser() {
  //   await setCookie("team", "Scoreboard");
  // }

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
    setWinnerState(true);
  };

  // useEffect(() => {
  //   configUser();
  // }, []);

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

  return (
    <Room>
      <EventListenerComponent
        setGreenProgress={setGreenProgress}
        setRedProgress={setRedProgress}
        setPurpleProgress={setPurpleProgress}
        setBlueProgress={setBlueProgress}
        setTimer={setTimer}
        setOpenStartModal={setOpenStartModal}
        setAnimationStarted={setAnimationStarted}
        setWinnerState={setWinnerState}
        setWinnerName={setWinnerName}
        setGreenCompletionProgress={setGreenCompletionProgress}
        setRedCompletionProgress={setRedCompletionProgress}
        setPurpleCompletionProgress={setPurpleCompletionProgress}
        setBlueCompletionProgress={setBlueCompletionProgress}
        greenCompletionProgress={greenCompletionProgress}
        redCompletionProgress={redCompletionProgress}
        purpleCompletionProgress={purpleCompletionProgress}
        blueCompletionProgress={blueCompletionProgress}
        starterCompletionProgressObject={starterCompletionProgressObject}
        startTimer={startTimer}
        resetTimer={resetTimer}
      />
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
      <Modal
        winnerState={winnerState}
        setWinnerState={setWinnerState}
        winnerName={winnerName}
        setWinnerName={setWinnerName}
      />
      <StartModal
        openStartModal={openStartModal}
        setOpenStartModal={setOpenStartModal}
        animationStarted={animationStarted}
        setAnimationStarted={setAnimationStarted}
      />
      <KeyboardNavigation
        setGreenProgress={setGreenProgress}
        setRedProgress={setRedProgress}
        setPurpleProgress={setPurpleProgress}
        setBlueProgress={setBlueProgress}
      />
    </Room>
  );
}

const EventListenerComponent = memo(function EventListenerComponent({
  setGreenProgress,
  setRedProgress,
  setBlueProgress,
  setPurpleProgress,
  setTimer,
  setOpenStartModal,
  setAnimationStarted,
  setWinnerState,
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
  startTimer,
  resetTimer
}) {
  console.log("Event listener online");
  useEventListener(({ event, user, connectionId }) => {
    console.log(user);
    console.log(connectionId);
    // type: teamName, complete: "stepThreeComplete", value: 20
    console.log(event);
    async function scoreRequest(event) {
      switch (event.type) {
        case GREEN:
          if (greenCompletionProgress[event.complete] === 0) {
            console.log("green score");
            setGreenProgress((prevProgress) => prevProgress + event.score);
            setGreenCompletionProgress({ ...greenCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
            console.log("greenCompletionProgress", greenCompletionProgress);
          }
          break;
        case RED:
          if (redCompletionProgress[event.complete] === 0) {
            console.log("red score");
            setRedProgress((prevProgress) => prevProgress + event.score);
            setRedCompletionProgress({ ...redCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
            console.log("redCompletionProgress", redCompletionProgress);
          }

          break;
        case PURPLE:
          if (purpleCompletionProgress[event.complete] === 0) {
            console.log("purple score");
            setPurpleProgress((prevProgress) => prevProgress + event.score);
            setPurpleCompletionProgress({ ...purpleCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
          }
          break;
        case BLUE:
          if (blueCompletionProgress[event.complete] === 0) {
            console.log("blue score");
            setBlueProgress((prevProgress) => prevProgress + event.score);
            setBlueCompletionProgress({ ...blueCompletionProgress, [event.complete]: 1 }); //to prevent user's from trigging the same flag over and over to get points
          }
          break;
        case "startTimer":
          console.log("starting timer");
          setAnimationStarted(true);
          // document.getElementById("timer-play-button")?.click();
          // startTimer();
          break;
        case "stopTimer":
          console.log("stopping timer");
          document.getElementById("timer-pause-button")?.click();
          break;
        case "resetTimer":
          console.log("resetting scoreboard");
          document.getElementById("timer-reset-button")?.click();
          setOpenStartModal(true);
          setTimer(defaultTimer);
          setWinnerState(false);
          setWinnerName("");
          setGreenProgress(0);
          setRedProgress(0);
          setBlueProgress(0);
          setPurpleProgress(0);
          setGreenCompletionProgress(starterCompletionProgressObject);
          setRedCompletionProgress(starterCompletionProgressObject);
          setPurpleCompletionProgress(starterCompletionProgressObject);
          setBlueCompletionProgress(starterCompletionProgressObject);
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
