import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_DB_URL as string;
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_DB_ANON_KEY as string;

const AdminPage = () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const handleStart = async () => {
    await supabase
      .from("scoreboard")
      .update({ isTimerRunning: true })
      .eq("id", 1);
  };

  const handleStop = async () => {
    await supabase
      .from("scoreboard")
      .update({ isTimerRunning: false })
      .eq("id", 1);
  };

  const handleReset = async () => {
    fetch("/api/apiReset");
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
};

export default AdminPage;
