//@ts-nocheck
import { Inter } from 'next/font/google'
import { ProgressStatus } from '@/components/progress-screen'
import { useEffect, useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Modal } from '@/components/modal';

const inter = Inter({ subsets: ['latin'] })

export default function Scoreboard() {
  const { playlist, sidebar, userplaylist } = useFlags();
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [timer, setTimer] = useState(300000);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [greenProgress, setGreenProgress] = useState(0);
  const [eventSource, setEventSource] = useState(null);


  // handling scoring logic


  // main display timer
  const decreaseMainTimer = () => {
    if (isTimerRunning) {
      setTimer((timer) => timer - 1);
    }
  };
const timerToMinutesSecondsMilliseconds = (timer: number) => {
  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor((timer % 60000) / 1000);
  const milliseconds = timer % 1000;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
};


  useEffect(() => {
    const eventSource = new EventSource('/api/sse')    
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(greenProgress)
      setGreenProgress(data[0].green.score);
      setRedProgress(data[0].red.score);
      setPurpleProgress(data[0].purple.score);
      setBlueProgress(data[0].blue.score);
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
  
  const timerInterval = setInterval(decreaseMainTimer, 1000);
  return () => {
    clearInterval(timerInterval);
    eventSource.close();
  };
  
  }, []);

  

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
      <div className="flex sticky top-10 place-items-center border border-zinc-500 mt-10 w-1/3 xl:w-1/6 bg-gradient-to-b from-zinc-900 from-10% via-zinc-600 via-50% to-zinc-900 to-90% justify-center rounded-xl">
        <div className="flex text-8xl sm:text-6xl font-bold text-white font-audimat mt-4">
          {timerToMinutesSecondsMilliseconds(timer)}
        </div>
      </div>
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