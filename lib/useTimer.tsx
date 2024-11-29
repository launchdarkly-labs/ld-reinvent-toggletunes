import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer(onComplete?: () => void) {
  const [timeLeft, setTimeLeft] = useState(15*60)
  const [isActive, setIsActive] = useState(false)
  const [duration, setDuration] = useState(15*60)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = useCallback(() => {
    console.log("hihit")
    if (timeLeft > 0) {
        console.log("timeLeft",timeLeft)
      setIsActive(true)
      console.log("intervalRef",intervalRef)
      intervalRef.current = setInterval(() => {
        console.log("alalalalalal tomny")
        setTimeLeft((time) => {
          if (time <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setIsActive(false)
            onComplete?.()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
  }, [timeLeft, onComplete])

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsActive(false)
    }
  }, [])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimeLeft(duration)
    setIsActive(false)
  }, [duration])

//   const setTime = useCallback((minutes: number) => {
//     const newDuration = minutes * 60;
//     console.log("newDuration",newDuration)
//     setDuration(newDuration)
//     setTimeLeft(newDuration)
//   }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return {
    timeLeft,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    // setTime,
    duration
  }
}

