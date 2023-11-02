//@ts-nocheck
import { Inter } from "next/font/google";
import { ProgressStatus } from "@/components/progress-screen";
import { useCallback, useEffect, useState, useRef } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Modal } from "@/components/modal";
import { Timer } from "@/components/Timer";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Scoreboard() {
  const { playlist, sidebar, userplaylist } = useFlags();
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [greenProgress, setGreenProgress] = useState(0);
  const [eventSource, setEventSource] = useState(null);
  const { data } = useSWR("/api/score-list", fetcher, { refreshInterval: 500 });
  const timerRef = useRef();

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
  }, [greenProgress, redProgress, blueProgress, purpleProgress, data]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-black">
      <Modal
        winnerState={winnerState}
        setWinnerState={setWinnerState}
        setResetScores={setResetScores}
        winnerName={winnerName}
        isExploding={isExploding}
        setIsExploding={setIsExploding}
      />
      <Timer ref={timerRef} />
      {/*<div className="flex items-center justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsTimerRunning(!isTimerRunning);
            setResetScores(false);
          }}
        >
          {isTimerRunning ? "Stop" : "Start"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => {
            setTimer(300);
            setIsTimerRunning(false);
            setResetScores(true);
          }}
        >
          Reset
        </button>
      </div>
        */}
      <ProgressStatus
        greenProgress={greenProgress}
        purpleProgress={purpleProgress}
        redProgress={redProgress}
        blueProgress={blueProgress}
      />
    </main>
  );
}
