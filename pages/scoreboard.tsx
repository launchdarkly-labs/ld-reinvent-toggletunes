//@ts-nocheck
import { ProgressStatus } from "@/components/progress-screen";
import { useEffect, useState, memo } from "react";
import { Modal } from "@/components/modal";
import { StartModal } from "@/components/start-modal";
import KeyboardNavigation from "@/components/KeyboardNavigation";
import { Room } from "@/components/room";
import { useBroadcastEvent, useEventListener } from "@/liveblocks.config";
import { setCookie } from "cookies-next";
import { time } from "console";

export default function Scoreboard() {
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [greenProgress, setGreenProgress] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(300000);
  const [openStartModal, setOpenStartModal] = useState(true);

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

  const timerToMinutesSecondsMilliseconds = (timer) => {
    if (timer <= 0 && isTimerRunning) {
      setTimer(0);
      setIsTimerRunning(false);
      endGame();
    }
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  async function configUser() {
    await setCookie("team", "Scoreboard");
  }

  const endGame = () => {
    const maxProgress = Math.max(
      greenProgress,
      redProgress,
      purpleProgress,
      blueProgress
    );
    let winners = [];
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
    console.log(winners.join(" & "));
    setWinnerName(winners.join(" & "));
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
    } else {
      setWinnerState(false);
    }
    if (resetScores === true) {
      setResetScores(false);
      setIsTimerRunning(false);
      setTimer(3000);
    }
  }, [
    greenProgress,
    redProgress,
    blueProgress,
    purpleProgress,
    isTimerRunning,
  ]);

  return (
    <Room>
      <EventListenerComponent
        setGreenProgress={setGreenProgress}
        setRedProgress={setRedProgress}
        setPurpleProgress={setPurpleProgress}
        setBlueProgress={setBlueProgress}
        setIsTimerRunning={setIsTimerRunning}
        setTimer={setTimer}
        setResetScores={setResetScores}
        setOpenStartModal={setOpenStartModal}
      />
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-black">
        <KeyboardNavigation
          setGreenProgress={setGreenProgress}
          setRedProgress={setRedProgress}
          setPurpleProgress={setPurpleProgress}
          setBlueProgress={setBlueProgress}
        />
        <Modal
          winnerState={winnerState}
          setWinnerState={setWinnerState}
          setResetScores={setResetScores}
          winnerName={winnerName}
        />
        <StartModal
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          openStartModal={openStartModal}
          setOpenStartModal={setOpenStartModal}
        />
        <div className="flex sticky top-10 place-items-center border border-zinc-500 mt-10 w-1/3 xl:w-1/6 bg-transparent justify-center rounded-xl">
          <div className="flex text-8xl sm:text-6xl font-bold text-white font-audimat mt-4">
            {timerToMinutesSecondsMilliseconds(timer)}
          </div>
        </div>
        <ProgressStatus
          greenProgress={greenProgress}
          purpleProgress={purpleProgress}
          redProgress={redProgress}
          blueProgress={blueProgress}
        />
      </main>
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
  setResetScores,
  setOpenStartModal,
}) {
  console.log("Event listener online");
  useEventListener(({ event, user, connectionId }) => {
    console.log(user);
    console.log(connectionId);
    // type: teamName, complete: "stepThreeComplete", value: 20
    console.log(event.value);
    async function scoreRequest(event) {
      switch (event.type) {
        case "green":
          setGreenProgress((prevProgress) => prevProgress + 20);
          break;
        case "red":
          setRedProgress((prevProgress) => prevProgress + 20);
          break;
        case "purple":
          setPurpleProgress((prevProgress) => prevProgress + 20);
          break;
        case "blue":
          setBlueProgress((prevProgress) => prevProgress + 20);
          break;
        case "startTimer":
          console.log("starting timer");
          setIsTimerRunning(true);
          break;
        case "stopTimer":
          console.log("stopping timer");
          setIsTimerRunning(false);
          break;
        case "resetTimer":
          console.log("resetting scoreboard");
          // await fetch("/api/apiReset");
          setIsTimerRunning(false);
          setOpenStartModal(true);
          setResetScores(true);
          setTimer(300000);
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
