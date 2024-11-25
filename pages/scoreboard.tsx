//@ts-nocheck
import KeyboardNavigation from "@/components/KeyboardNavigation";
import { Modal } from "@/components/modal";
import { ProgressStatus } from "@/components/progress-screen";
import { Room } from "@/components/room";
import { StartModal } from "@/components/start-modal";
import { useEventListener } from "@/liveblocks.config";
import { setCookie } from "cookies-next";
import { memo, useEffect, useState } from "react";

const defaultTimer = 900000; //15 min
export default function Scoreboard() {
  const [redProgress, setRedProgress] = useState<number>(0);
  const [purpleProgress, setPurpleProgress] = useState<number>(0);
  const [blueProgress, setBlueProgress] = useState<number>(0);
  const [greenProgress, setGreenProgress] = useState<number>(0);
  const [winnerState, setWinnerState] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(defaultTimer);
  const [openStartModal, setOpenStartModal] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  const decreaseMainTimer = () => {
    if (isTimerRunning) {
      setTimer((timer) => timer - 100);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(decreaseMainTimer, 100);
    return () => {
      clearInterval(timerInterval);
    };
  }, [isTimerRunning]);

  const timerToMinutesSecondsMilliseconds = (timer: number): string => {
    if (timer <= 0 && isTimerRunning) {
      setIsTimerRunning(false);
      endGame();
    }
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  async function configUser() {
    await setCookie("team", "Scoreboard");
  }

  const endGame = () => {
    const maxProgress = Math.max(greenProgress, redProgress, purpleProgress, blueProgress);
    let winners = [];
    let winnerName = "";
    if (maxProgress === greenProgress) {
      winners.push("green");
    }
    if (maxProgress === redProgress) {
      winners.push("red");
    }
    if (maxProgress === purpleProgress) {
      winners.push("purple");
    }
    if (maxProgress === blueProgress) {
      winners.push("blue");
    }
    // TODO: Nothing happens on tie currently
    if (winners.length > 1) {
      winnerName = "";
    } else {
      winnerName = winners[0];
    }
    setIsTimerRunning(false);
    setWinnerName(winnerName);
    setWinnerState(true);
  };

  useEffect(() => {
    configUser();
  }, []);

  useEffect(() => {
    if (
      greenProgress >= 100 ||
      redProgress >= 100 ||
      purpleProgress >= 100 ||
      blueProgress >= 100
    ) {
      endGame();
    }
  }, [greenProgress, redProgress, blueProgress, purpleProgress, isTimerRunning, winnerName]);

  return (
    <Room>
      <EventListenerComponent
        setGreenProgress={setGreenProgress}
        setRedProgress={setRedProgress}
        setPurpleProgress={setPurpleProgress}
        setBlueProgress={setBlueProgress}
        setIsTimerRunning={setIsTimerRunning}
        setTimer={setTimer}
        setOpenStartModal={setOpenStartModal}
        setAnimationStarted={setAnimationStarted}
        setWinnerState={setWinnerState}
        setWinnerName={setWinnerName}
      />
      <main
        className="  
       h-full
          bg-black"
      >
        <div
          className="flex flex-col bg-[#191919] mx-auto max-w-8xl h-full gap-y-10
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
            greenProgress={100}
            purpleProgress={40}
            redProgress={20}
            blueProgress={blueProgress}
          />
          <section
            id="scoreboard-wrapper"
            className="flex sticky 
  place-items-center border border-zinc-500 
  w-1/3 xl:w-1/6 bg-gradient-scoreboard-timer-background justify-center rounded-md"
          >
            <div
              id="scoreboard-text"
              className="flex text-8xl sm:text-6xl font-bold bg-transparent bg-gradient-scoreboard-timer-text text-transparent bg-clip-text font-audimat mt-4"
            >
              {timerToMinutesSecondsMilliseconds(timer)}
            </div>
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
        setIsTimerRunning={setIsTimerRunning}
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
  setIsTimerRunning,
  setTimer,
  setOpenStartModal,
  setAnimationStarted,
  setWinnerState,
  setWinnerName,
}) {
  console.log("Event listener online");
  useEventListener(({ event, user, connectionId }) => {
    console.log(user);
    console.log(connectionId);
    // type: teamName, complete: "stepThreeComplete", value: 20
    console.log(event);
    //TODO: here you can change event.type or event.complete or event.step and change type of progress for semi steps
    async function scoreRequest(event) {
      switch (event.type) {
        case "green":
          console.log("green score");
          setGreenProgress((prevProgress) => prevProgress + 20);
          break;
        case "red":
          console.log("red score");
          setRedProgress((prevProgress) => prevProgress + 20);
          break;
        case "purple":
          console.log("purple score");
          setPurpleProgress((prevProgress) => prevProgress + 20);
          break;
        case "blue":
          console.log("blue score");
          setBlueProgress((prevProgress) => prevProgress + 20);
          break;
        case "startTimer":
          console.log("starting timer");
          setIsTimerRunning(true);
          setAnimationStarted(true);
          break;
        case "stopTimer":
          console.log("stopping timer");
          setIsTimerRunning(false);
          break;
        case "resetTimer":
          console.log("resetting scoreboard");
          setIsTimerRunning(false);
          setOpenStartModal(true);
          setTimer(defaultTimer);
          setWinnerState(false);
          setWinnerName("");
          setGreenProgress(0);
          setRedProgress(0);
          setBlueProgress(0);
          setPurpleProgress(0);
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
