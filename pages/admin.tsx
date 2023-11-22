import { Room } from "@/components/room";
import { useBroadcastEvent } from "@/liveblocks.config";
import { useState } from "react";

export default function AdminPage() {
  return (
    <Room>
      <AdminUIComponent />
    </Room>
  );
}

function AdminUIComponent() {
  const broadcast = useBroadcastEvent();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [archivedMessage, setArchivedMessage] = useState("");

  const handleStart = async () => {
    setArchivedMessage("");
    setDisplayMessage(false);
    broadcast({ type: "startTimer" });
  };

  const handleStop = async () => {
    broadcast({ type: "stopTimer" });
  };

  const handleReset = async (e: any) => {
    setArchivedMessage("");
    setDisplayMessage(false);
    e.target.disabled = true;
    e.target.innerText = "Resetting...";
    broadcast({ type: "resetTimer" });
    const resp = await fetch("/api/apiReset");
    if (resp.ok) {
      console.log("Reset successful");
      handleReload();
    } else {
      console.log("Reset failed");
      setDisplayMessage(true);
    }
    e.target.innerText = "Reset";
    e.target.disabled = false;
  };

  const handleReload = async () => {
    broadcast({ type: "reload" });
  };

  const handleArchived = async () => {
    setArchivedMessage("");
    const resp = await fetch("/api/archived");
    if (resp.ok) {
      const data = await resp.json();
      setArchivedMessage(data.message);
    }
  };

  return (
    <div>
      {displayMessage && (
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span className="font-bold">Reset failed</span> Please try running it
          again.
        </div>
      )}
      {archivedMessage !== "" && (
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          {archivedMessage}
        </div>
      )}
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-4xl py-2 px-4 rounded w-screen mb-5"
      >
        Reset
      </button>
      <button
        onClick={handleReload}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold text-4xl py-2 px-4 rounded w-screen mb-5"
      >
        Reload
      </button>
      <button
        onClick={handleArchived}
        className="bg-gray-600 hover:bg-gray-800 text-white font-bold text-4xl py-2 px-4 rounded w-screen"
      >
        Check for Archived Flags
      </button>
    </div>
  );
}
