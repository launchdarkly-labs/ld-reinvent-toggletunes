import { createContext, useState, useEffect } from "react";

const TimerContext = createContext();

export default TimerContext;
//TODO: in order for timer to sync between scoreboard and admin, i think you need liveblocks as a place to store the value
export const TimerProvider = ({ children }: { children: any }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(600000);
  const [openStartModal, setOpenStartModal] = useState(true);
  //const [timerIntervalID, setTimerIntervalID] = useState(null);

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

  const timerToMinutesSecondsMilliseconds = (timer:number, endGame:any):string => {
    if (timer <= 0 && isTimerRunning) {
      setIsTimerRunning(false);
      endGame();
    }
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TimerContext.Provider
      value={{
        timer,
        isTimerRunning,
        setIsTimerRunning,
        setTimer,
        timerToMinutesSecondsMilliseconds,
        setOpenStartModal,
        openStartModal,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
