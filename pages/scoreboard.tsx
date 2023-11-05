//@ts-nocheck
import { ProgressStatus } from "@/components/progress-screen";
import { useEffect, useState, useContext } from "react";
import { Modal } from "@/components/modal";
import { StartModal } from "@/components/start-modal";
import TimerContext from "@/lib/contexts";
import {createClient} from '@supabase/supabase-js'
import KeyboardNavigation from "@/components/KeyboardNavigation";
// import useSWR from "swr";
// const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Scoreboard() {
  const [redProgress, setRedProgress] = useState(0);
  const [purpleProgress, setPurpleProgress] = useState(0);
  const [blueProgress, setBlueProgress] = useState(0);
  const [winnerState, setWinnerState] = useState(false);
  const [resetScores, setResetScores] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [greenProgress, setGreenProgress] = useState(0);
  // const { data } = useSWR("/api/score-list", fetcher);
  const { timer, isTimerRunning, setTimer, setIsTimerRunning, timerToMinutesSecondsMilliseconds } = useContext(TimerContext);
  const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL, process.env.NEXT_PUBLIC_DB_ANON_KEY);


async function GetAllScoreValues() {
  console.log("running update")
  let { data, error } = await supabase
    .from('scoreboard')
    .select('*')

  if (error) throw error

  setBlueProgress(data[0].blue);
  setRedProgress(data[0].red);
  setPurpleProgress(data[0].purple);
  setGreenProgress(data[0].green);
}

  useEffect(() => {
    //subscribing to supabase events
    supabase
      .channel("supabase")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scoreboard",
          filter: "id=eq.1",
        },
        (payload) => {
          console.log(payload)
          // Adjusted for debugging inconsistent scoreboard updates
          GetAllScoreValues()
          // setGreenProgress(payload.new.green);
          // setRedProgress(payload.new.red);
          // setPurpleProgress(payload.new.purple);
          // setBlueProgress(payload.new.blue);
        }
      )
      .subscribe();
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
  }, [greenProgress, redProgress, blueProgress, purpleProgress, isTimerRunning]);

  return (
    <TimerContext.Provider
      value={{ timer, isTimerRunning, setIsTimerRunning, setTimer }}
    >
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-black">
        <KeyboardNavigation />
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
