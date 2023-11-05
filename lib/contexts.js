import { createContext, useState, useEffect } from "react";

const TimerContext = createContext();

export default TimerContext;

export const TimerProvider = ({children}) => {
const [isTimerRunning, setIsTimerRunning] = useState(false);
const [timer, setTimer] = useState(300000);

const decreaseMainTimer = () => {
    if (isTimerRunning) {
      setTimer((timer) => timer - 100);
    }
  };
  useEffect(() => {
    const timerInterval = setInterval(decreaseMainTimer, 100);
  return () => {
    clearInterval(timerInterval);
  }
  },[isTimerRunning])

  const timerToMinutesSecondsMilliseconds = (timer) => {
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TimerContext.Provider
      value={{ timer, isTimerRunning, setIsTimerRunning, setTimer, timerToMinutesSecondsMilliseconds }}
    >
      {children}
    </TimerContext.Provider>
  );
}
