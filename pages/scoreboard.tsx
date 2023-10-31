//@ts-nocheck
import { Inter } from 'next/font/google'
import { ProgressStatus } from '@/components/progress-screen'
import { useEffect, useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Modal } from '@/components/modal';
import { TeamModal } from '@/components/Team-Modal';
import ScoreTable from '@/components/table'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { playlist, sidebar, userplaylist } = useFlags();
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [timer, setTimer] = useState(300);
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
  const timerToMinutesSeconds = (timer: any) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };


  useEffect(() => {
    const eventSource = new EventSource('/api/sse')    
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.teamname === 'Green Team') {
      setGreenProgress(data.score)
      }
      if (data.teamname === 'Red Team') {
      setRedProgress(data.score)
      }
      if (data.teamname === "Purple Team") {
      setPurpleProgress(data.score);
      }
      if (data.teamname === "Blue Team") {
      setBlueProgress(data.score);
      }
      console.log(data.score);
      console.log(data);
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
      setTimer(300);
    }
  
  const timerInterval = setInterval(decreaseMainTimer, 1000);
  return () => {
    clearInterval(timerInterval);
    if (eventSource) {
      eventSource.close();
    }
  };
  
  }, [
    playlist,
    sidebar,
    userplaylist,
    resetScores,
    isTimerRunning,
    greenProgress,
  ]);

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <Modal
        winnerState={winnerState}
        setWinnerState={setWinnerState}
        setResetScores={setResetScores}
        winnerName={winnerName}
        isExploding={isExploding}
        setIsExploding={setIsExploding}
      />
      <h1 className="text-8xl font-sohnemono m-5 text-transparent bg-clip-text bg-gradient-to-r from-ldred from-10% to-ldyellow to-100% p-4">
        ToggleTunes Scoreboard
      </h1>
      <img
        src="/images/GridIcon.png"
        alt="Ship"
        className="absolute top-0 left-0 z-10"
      />
      <img
        src="/images/Stickers.png"
        alt="Ship"
        className="absolute bottom-0 right-0 z-10"
      />
      <img
        src="/images/HolyShip.png"
        alt="Ship"
        className="absolute bottom-0 left-0 z-10"
      />
      <div className="flex items-center justify-center mt-8">
        <div className="text-4xl font-bold text-white mr-4">
          {timerToMinutesSeconds(timer)}
        </div>
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
      <ProgressStatus
        greenProgress={greenProgress}
        purpleProgress={purpleProgress}
        redProgress={redProgress}
        blueProgress={blueProgress}
      />
      <ScoreTable
        greenProgress={greenProgress}
        redProgress={redProgress}
        purpleProgress={purpleProgress}
        blueProgress={blueProgress}
      />
    </main>
  );
}