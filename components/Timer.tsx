import TimerContext from "@/lib/contexts";
import { useContext } from "react";

export default function Timer() {
  const { timer } = useContext(TimerContext);

  // TODO: This function is duplicated and never called but IDE shows an error if it isn't here
  const timerToMinutesSecondsMilliseconds = (timer: any) => {
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.floor((timer % 60000) / 1000);
    const milliseconds = timer % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex sticky top-10 place-items-center border border-zinc-500 mt-10 w-1/3 xl:w-1/6 bg-gradient-to-b from-zinc-900 from-10% via-zinc-600 via-50% to-zinc-900 to-90% justify-center rounded-xl">
      <div className="flex text-8xl sm:text-6xl font-bold text-white font-audimat mt-4">
        {timerToMinutesSecondsMilliseconds(timer)}
      </div>
    </div>
  );
}
