import { useState, useRef, useCallback, useEffect } from "react";

export function useTimer(onComplete?: () => void) {
  const defaultTime = 15 * 60; //15 min
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(defaultTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timeLeft > 0) {
      setIsActive(true);
     
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
  }, [timeLeft, onComplete]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    }
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(duration);
    setIsActive(false);
  }, [duration]);

  //   const setTime = useCallback((minutes: number) => {
  //     const newDuration = minutes * 60;
  //     console.log("newDuration",newDuration)
  //     setDuration(newDuration)
  //     setTimeLeft(newDuration)
  //   }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    timeLeft,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    // setTime,
    duration,
  };
}
