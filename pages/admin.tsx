import { Room } from "@/components/room";
import { useBroadcastEvent } from "@/liveblocks.config";

export default function AdminPage() {
  return (
    <Room>
      <AdminUIComponent />
    </Room>
  );
}

function AdminUIComponent() {
  const broadcast = useBroadcastEvent();

  const handleStart = async () => {
    broadcast({ type: "startTimer" });
  };

  const handleStop = async () => {
    broadcast({ type: "stopTimer" });
  };

  const handleReset = async () => {
    broadcast({ type: "resetTimer" });
  };

  return (
    <div>
      <button
        onClick={handleStart}
        className="bg-green-500 hover:bg-green-700 text-white font-bold text-4xl py-2 px-4 rounded w-screen mb-5"
      >
        Start
      </button>
      <button
        onClick={handleStop}
        className="bg-red-500 hover:bg-red-700 text-white font-bold text-4xl py-2 px-4 rounded w-screen mb-5"
      >
        Stop
      </button>
      <button
        onClick={handleReset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-4xl py-2 px-4 rounded w-screen"
      >
        Reset
      </button>
    </div>
  );
}
