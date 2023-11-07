//@ts-nocheck
import { ProgressStatus } from "@/components/progress-screen";
import { useEffect, useState, useContext } from "react";
import { Modal } from "@/components/modal";
import { StartModal } from "@/components/start-modal";
import TimerContext from "@/lib/contexts";
import KeyboardNavigation from "@/components/KeyboardNavigation";
import { Room } from "@/components/room";
import { useBroadcastEvent, useEventListener } from "@/liveblocks.config";

export default function Scoreboard() {
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [greenProgress, setGreenProgress] = useState(0);
  const [flagOne, setFlagOne] = useState(false);
  const [flagTwo, setFlagTwo] = useState(false);
  const [flagThree, setFlagThree] = useState(false);
  const [flagFour, setFlagFour] = useState(false);
  const [flagFive, setFlagFive] = useState(false);
  const [openStartModal, setOpenStartModal] = useState(true);

  const {
    timer,
    isTimerRunning,
    setTimer,
    setIsTimerRunning,
    timerToMinutesSecondsMilliseconds,
  } = useContext(TimerContext);

  useEffect(() => {
    if (
      greenProgress >= 100 ||
      redProgress >= 100 ||
      purpleProgress >= 100 ||
      blueProgress >= 100
    ) {
      setWinnerState(true);
      setIsExploding(true);
    } else {
      setWinnerState(false);
    }
    if (resetScores === true) {
      setGreenProgress(0);
      setResetScores(false);
      setIsTimerRunning(false);
      setTimer(300000);
    }
    if (timer === 0) {
      const maxProgress = Math.max(
        greenProgress,
        redProgress,
        purpleProgress,
        blueProgress
      );
      if (maxProgress === greenProgress) {
        setWinnerName("green");
      } else if (maxProgress === redProgress) {
        setWinnerName("red");
      } else if (maxProgress === purpleProgress) {
        setWinnerName("purple");
      } else if (maxProgress === blueProgress) {
        setWinnerName("blue");
      }
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
        setOpenStartModal={setOpenStartModal}
      />
      <TimerContext.Provider
        value={{ timer, isTimerRunning, setIsTimerRunning, setTimer }}
      >
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
      </TimerContext.Provider>
    </Room>
  );
}

function EventListenerComponent({
  setGreenProgress,
  setRedProgress,
  setBlueProgress,
  setPurpleProgress,
  setIsTimerRunning,
  setTimer,
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
          setOpenStartModal(true);
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
}
