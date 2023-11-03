//@ts-nocheck
import { ProgressStatus } from "@/components/progress-screen";
import { useEffect, useState, useContext } from "react";
import { Modal } from "@/components/modal";
import { StartModal } from "@/components/start-modal";
import useSWR from "swr";
import TimerContext from "@/lib/contexts";
import { TimerProvider } from "@/lib/contexts";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Scoreboard() {
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [greenProgress, setGreenProgress] = useState(0);
  const { data } = useSWR("/api/score-list", fetcher, { refreshInterval: 500 });
  const { timer, isTimerRunning, setTimer, setIsTimerRunning, timerToMinutesSecondsMilliseconds } = useContext(TimerContext);


  useEffect(() => {
    if (data) {
      setGreenProgress(data[0].score[1]);
      setRedProgress(data[1].score[1]);
      setPurpleProgress(data[2].score[1]);
      setBlueProgress(data[3].score[1]);
    }
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
      const maxProgress = Math.max(greenProgress, redProgress, purpleProgress, blueProgress);
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
  }, [greenProgress, redProgress, blueProgress, purpleProgress, isTimerRunning, data]);

  return (
    <TimerContext.Provider
      value={{ timer, isTimerRunning, setIsTimerRunning, setTimer }}
    >
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-black">
        <Modal
          winnerState={winnerState}
          setWinnerState={setWinnerState}
          setResetScores={setResetScores}
          winnerName={winnerName}
          isExploding={isExploding}
          setIsExploding={setIsExploding}
        />
        <StartModal 
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}/>
        <div className="flex sticky top-10 place-items-center border border-zinc-500 mt-10 w-1/3 xl:w-1/6 bg-gradient-to-b from-zinc-900 from-10% via-zinc-600 via-50% to-zinc-900 to-90% justify-center rounded-xl">
          <div className="flex text-8xl sm:text-6xl font-bold text-white font-audimat mt-4">
            {timerToMinutesSecondsMilliseconds(timer)}
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsTimerRunning(!isTimerRunning);
            }}
          >
            {isTimerRunning ? "Stop" : "Start"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={() => {
              setTimer(300000);
              setIsTimerRunning(false);
            }}
          >
            Reset
          </button>
        </div>
        <ProgressStatus
          greenProgress={greenProgress}
          purpleProgress={purpleProgress}
          redProgress={redProgress}
          blueProgress={blueProgress}
        />
      </main>
    </TimerContext.Provider>
  );
}
