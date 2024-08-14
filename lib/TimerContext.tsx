import { createContext, useState, useEffect } from "react";

const TimerContext = createContext();

export default TimerContext;
//THIS WAS NOT USED
export const TimerProvider = ({ children }: { children: any }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(300000);
  const [openStartModal, setOpenStartModal] = useState(true);
  const [timerIntervalID, setTimerIntervalID] = useState(null);

  const decreaseMainTimer = () => {
    if (isTimerRunning) {
      setTimer((timer) => timer - 100);
    }
  };
  useEffect(() => {
    const timerInterval = setInterval(decreaseMainTimer, 100);
    setTimerIntervalID(timerInterval);
    return () => {
      clearInterval(timerInterval);
    };
  }, [isTimerRunning]);

  const timerToMinutesSecondsMilliseconds = (timer:number):string => {
    if (timer <= 0) {
      setTimer(0);
      setIsTimerRunning(false);
    }
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
