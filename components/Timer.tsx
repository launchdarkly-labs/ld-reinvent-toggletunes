"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useTimer } from "@/lib/useTimer";
import { formatTime } from "@/lib/utils";

export default function Timer({ endGame }: { endGame: any }) {
  //   const [minutes, setMinutes] = useState("25");
  const [showNotification, setShowNotification] = useState(false);

  const onComplete = () => {
    setShowNotification(true);
    // Play notification sound
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  const { timeLeft, isActive, startTimer, pauseTimer, resetTimer, duration } = useTimer(onComplete);

  //   const progress = duration ? (timeLeft / duration) * 100 : 0;

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const mins = parseInt(minutes);
  //     if (!isNaN(mins) && mins > 0) {
  //       setTime(mins);
  //       setShowNotification(false);
  //     }
  //   };

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showNotification]);

  return (
    <Card className="w-full max-w-md mx-auto border-none ">
      <CardContent className="!p-4">
        {/* <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                min="1"
                max="60"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                disabled={isActive}
              />
            </div>
            <Button type="submit" disabled={isActive}>
              Set Timer
            </Button>
          </div>
        </form> */}

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold bg-transparent bg-gradient-scoreboard-timer-text text-transparent bg-clip-text font-audimat">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* <Progress value={progress} className="h-2" /> */}

          <div className=" justify-center hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={startTimer}
              disabled={timeLeft === 0 || isActive}
              className="hidden"
              id="timer-play-button"
            >
              <Play className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={pauseTimer}
              disabled={timeLeft === 0 || !isActive}
              className="hidden"
              id="timer-pause-button"
            >
              <Pause className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              disabled={timeLeft === duration}
              className="hidden"
              id="timer-reset-button"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {showNotification && (
            <div className="text-center text-green-600 font-medium animate-bounce">
              Time&apos;s up!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
