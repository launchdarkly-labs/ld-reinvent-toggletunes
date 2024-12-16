import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import {
  BarChart,
  Users,
  Server,
  Search,
  Bell,
  Menu,
  Moon,
  Sun,
  Play,
  XIcon,
  RotateCcw,
  RefreshCw,
  Home,
  Archive,
  X,
  Award,
  Crown,
  Trophy,
  ListRestart,
  MinusCircle,
} from "lucide-react";
import Link from "next/link";

import { Room } from "@/components/room";
import { useBroadcastEvent } from "@/liveblocks.config";
import { wait } from "@/lib/utils";
import { WINNER, BLUE, RED, PURPLE, COLORBACKGROUNDGRADIENT } from "@/lib/constant";
import { is } from "drizzle-orm";
import { PlusCircle } from "lucide-react";

export default function Admin() {
  return (
    <Room>
      <GameAdminDashboard />
    </Room>
  );
}

function GameAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [resetProgress, setResetProgress] = useState(0);
  const [codeLogs, setCodeLogs] = useState<string[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [resetProgressMessage, setResetProgressMessage] = useState("");

  const broadcast = useBroadcastEvent();
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [archivedMessage, setArchivedMessage] = useState("");
  const [buttonFeedback, setButtonFeedback] = useState("");

  const handleStart = async () => {
    setArchivedMessage("");
    setDisplayErrorMessage(false);
    setIsResetting(false);

    broadcast({ type: "startTimer" });

    if (buttonFeedback.includes("Stopped")) {
      setButtonFeedback("Continue with the game!");
      await wait(10);
      setButtonFeedback("");
    } else if (buttonFeedback.includes("Continue")) {
      setButtonFeedback("");
    } else {
      setButtonFeedback("Starting new game!");
      await wait(10);
      setButtonFeedback("");
    }
  };

  const handleStop = async () => {
    broadcast({ type: "stopTimer" });
    setButtonFeedback("Stopped time!");
  };

  const handleColorWinner = async (winnerColor: string) => {
    broadcast({ type: winnerColor });
    setButtonFeedback(`Triggered ${winnerColor}`);
  };

  const handleManualPointTrigger = (colorTeam: string, points: number) => {
    broadcast({ type: `${colorTeam}ManualPoints`, score: points });
    setButtonFeedback(`Sent ${points} pts to ${colorTeam}`);
  };

  //40 sec and then go to the end when finish
  const handleReset = async () => {
    broadcast({ type: "resetTimer" });
    setButtonFeedback("Resetting the game and flags!");
    setArchivedMessage("");
    setResetProgressMessage("Start Resetting");
    setDisplayErrorMessage(false);
    setResetProgress(0);
    setCodeLogs([]);
    setIsDisabled(true);
    setIsResetting(true);

    //TODO: need to show green for success. maybe a change in messaging when reached to 90%?
    const interval = setInterval(() => {
      setResetProgress((prevProgress) => {
        if (prevProgress === 90) {
          clearInterval(interval);
          return 90;
        } else if (prevProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = prevProgress + 10;

        if (newProgress <= 20) {
          setResetProgressMessage("Resetting Team 1 LD Env...");
        } else if (20 < newProgress && newProgress <= 40) {
          setResetProgressMessage("Resetting Team 2 LD Env...");
        } else if (40 < newProgress && newProgress <= 60) {
          setResetProgressMessage("Resetting Team 3 LD Env...");
        } else if (60 < newProgress && newProgress <= 80) {
          setResetProgressMessage("Tying things up...");
          // setResetProgressMessage("Resetting Team 4 LD Env...");
        } else {
          setResetProgressMessage("Tying things up...");
        }

        return newProgress;
      });
    }, 3000);

    let resp: Response;
    let respJson: { success: string; errorType?: string; errorMessage?: string; error?: string };

    try {
      resp = await fetch("/api/apiReset");

      respJson = await resp.json();
      console.log(respJson);

      setCodeLogs((prevLogs) => [
        ...prevLogs,
        `Status: ${resp.status}, 
        Status Text: ${resp.statusText},
        ${respJson.errorMessage ? `errorMessage: ${respJson.errorMessage}` : ""}
        ${respJson.errorType ? `errorType: ${respJson.errorType}` : ""}
        ${respJson.error ? `error: ${respJson.error}` : ""}
        ${respJson.success ? `success: ${respJson.success}` : ""}
        url: ${resp.url}`,
      ]);

      if (resp.status === 200) {
        setResetProgressMessage("Reset Complete!");
        setButtonFeedback("");
      } else {
        setResetProgressMessage("Check the code log for more information.");
      }

      // @ts-ignore
      console.log(resp);

      setResetProgress(100);
      setIsDisabled(false);
      // await wait(120);
      //setIsResetting(false);
    } catch (error: any) {
      setCodeLogs((prevLogs) => [
        ...prevLogs,
        `Status: ${resp.status}
        Status Text: ${resp.statusText}
        error: ${error}
        url: ${resp.url}`,
      ]);
      // @ts-ignore
      console.log(resp);
      setResetProgress(100);
      setResetProgressMessage("Reset Failed!");
      setDisplayErrorMessage(true);
      setIsDisabled(false);
    }
  };
  const COLORBACKGROUNDGRADIENT2 = {
    [RED]: "bg-gradient-red-winner-background",
    [BLUE]: "bg-gradient-blue-winner-background",
    [PURPLE]: "bg-gradient-purple-winner-background",
  };
  const handleReload = async () => {
    broadcast({ type: "resetTimer" });
    setButtonFeedback("Reset points back to the start");
    await wait(8);
    setButtonFeedback("");
  };

  // const handleArchived = async () => {
  //   setArchivedMessage("");
  //   const resp = await fetch("/api/archived");
  //   if (resp.ok) {
  //     const data = await resp.json();
  //     setArchivedMessage(data.message);
  //   }
  // };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-mono">
      {/* Sidebar */}
      {/* <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-purple-700">
          <span className="text-white text-2xl font-semibold">Game Admin</span>
        </div>
        <nav className="mt-8">
          <Link href="#" className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700">
            <BarChart className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700">
            <Users className="w-5 h-5 mr-3" />
            Players
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700">
            <Server className="w-5 h-5 mr-3" />
            Servers
          </Link>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800">
          <div className="container flex justify-between mx-auto  px-6 py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              {/* <div className="relative">
                <Search className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 bg-gray-700 text-white border-gray-600 focus:border-purple-500"
                />
              </div> */}

              <Link href="/" className=" text-gray-300 hover:bg-gray-700" title="Home">
                <img src="/images/ToggleTunes.png" className="h-10" />
              </Link>
            </div>
            {/* <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <img src="/placeholder.svg?height=32&width=32" alt="Admin" className="rounded-full" />
            </Button>
          </div> */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-white mb-6">Dashboard</h1>
            {/* Stats Cards */}
            {/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Total Players" value="10,245" icon={<Users className="h-8 w-8" />} />
              <StatCard title="Active Servers" value="23" icon={<Server className="h-8 w-8" />} />
              <StatCard title="Daily Active Users" value="5,678" icon={<BarChart className="h-8 w-8" />} />
              <StatCard title="Revenue" value="$12,345" icon={<BarChart className="h-8 w-8" />} />
            </div> */}

            {/* Game Controls */}
            <h2 className="text-2xl font-semibold text-yellow-500 mb-6">{buttonFeedback}</h2>
            <section className="bg-gray-800 shadow rounded-lg p-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Game Controls</h2>
              {!resetProgressMessage.includes("complete") ||
                (!resetProgressMessage.includes("") && (
                  <p className="text-base text-white mb-4">
                    Buttons are disabled due to resetting.
                  </p>
                ))}

              <div className="flex flex-wrap gap-8">
                <Button
                  className="flex items-center bg-green-600 hover:brightness-125 text-white"
                  onClick={() => handleStart()}
                  id="admin-start"
                  disabled={isDisabled}
                >
                  <Play className="mr-2 h-4 w-4" /> Start
                </Button>
                <Button
                  className="flex items-center bg-red-600  hover:brightness-125 text-white"
                  onClick={() => handleStop()}
                  id="admin-stop"
                  disabled={isDisabled}
                >
                  <XIcon className="mr-2 h-4 w-4" /> Stop
                </Button>

                <Button
                  className="flex items-center bg-purple-600 hover:brightness-125 text-white  p-2"
                  onClick={() => handleReload()}
                  id="admin-reload"
                  disabled={isDisabled}
                >
                  <ListRestart className="mr-2 h-4 w-4" /> Quick Reset without Reset Flag
                </Button>

                <Button
                  className="flex items-center bg-yellow-600 hover:brightness-125 text-white"
                  onClick={() => handleReset()}
                  id="admin-reset"
                  disabled={isDisabled}
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset Game and Flag
                </Button>

                {/* <Button
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => handleArchived()}
                  id="admin-archive"
                  disabled={isDisabled}
                >
                  <Archive className="mr-2 h-4 w-4" /> Archive
                </Button> */}
              </div>
            </section>

            {/* Error Message Bar Card */}
            {displayErrorMessage || archivedMessage !== "" ? (
              <section className="bg-gray-800 shadow rounded-lg p-4 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Error Message</h2>
                <div
                  className=" text-lg text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                  role="alert"
                >
                  {displayErrorMessage && (
                    <h3>
                      Reset <span className="font-bold text-xl text-red-500">failed</span>! Please
                      try running it again or refreshing the page.
                    </h3>
                  )}
                  {archivedMessage !== "" && <h3>{archivedMessage}</h3>}
                </div>
              </section>
            ) : null}

            {/* Progress Bar Card */}
            {isResetting && (
              <section className="bg-gray-800 shadow rounded-lg p-4 mb-8">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white ">Reset Progress</h2>
                  {resetProgress === 100 && (
                    <button onClick={() => setIsResetting(false)}>
                      <XIcon />
                    </button>
                  )}
                </div>

                <p className="text-base text-white mb-4">{resetProgressMessage}</p>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${resetProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-300">Progress: {resetProgress}%</p>
              </section>
            )}

            {/* Code Logs Card */}
            {(isResetting || displayErrorMessage) && (
              <section className="bg-gray-800 shadow rounded-lg p-4 mb-8">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white ">Code Logs</h2>
                  {resetProgress === 100 && (
                    <button onClick={() => setIsResetting(false)}>
                      <XIcon />
                    </button>
                  )}
                </div>

                <div className="bg-gray-900 p-4 rounded-lg h-48 overflow-y-auto">
                  {codeLogs.map((log, index) => (
                    <p key={index} className="text-gray-300 font-mono whitespace-pre-line">
                      {log}
                    </p>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-gray-800 shadow rounded-lg p-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Manually Trigger Winner</h2>

              <div className="flex flex-wrap gap-8">
                <Button
                  className="flex items-center bg-gradient-blue-progress-bar  hover:brightness-125 text-white"
                  onClick={() => handleColorWinner(`${BLUE}${WINNER}`)}
                  id="admin-blueWinner"
                  disabled={isDisabled}
                >
                  <Award className="mr-2 h-4 w-4" /> Trigger Blue Winner
                </Button>
                <Button
                  className="flex items-center bg-gradient-red-progress-bar  hover:brightness-125 text-white"
                  onClick={() => handleColorWinner(`${RED}${WINNER}`)}
                  id="admin-redWinner"
                  disabled={isDisabled}
                >
                  <Trophy className="mr-2 h-4 w-4" /> Trigger Red Winner
                </Button>

                <Button
                  className="flex items-center bg-gradient-purple-progress-bar  hover:brightness-125 text-white"
                  onClick={() => handleColorWinner(`${PURPLE}${WINNER}`)}
                  id="admin-purpleWinner"
                  disabled={isDisabled}
                >
                  <Crown className="mr-2 h-4 w-4" /> Trigger Purple Winner
                </Button>
              </div>
            </section>

            {[BLUE, RED, PURPLE].map((color, index) => {
              return (
                <section
                  // @ts-ignore
                  className={`${COLORBACKGROUNDGRADIENT2[color]} shadow rounded-lg p-4 mb-8`}
                  key={index}
                >
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {` Manually Trigger ${color.toUpperCase()} Points`}
                  </h2>

                  <div className="flex flex-wrap gap-8">
                    <Button
                      className="flex items-center bg-ldblue  hover:brightness-125 text-white"
                      onClick={() => handleManualPointTrigger(color, 20)}
                      id="admin-bluepoints20plus"
                      disabled={isDisabled}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> +20 pts
                    </Button>
                    <Button
                      className="flex items-center bg-ldred hover:brightness-125 text-white"
                      onClick={() => handleManualPointTrigger(color, -20)}
                      id="admin-bluepoints20minus"
                      disabled={isDisabled}
                    >
                      <MinusCircle className="mr-2 h-4 w-4" /> -20 pts
                    </Button>

                    <Button
                      className="flex items-center bg-lddblue  hover:brightness-125 text-white"
                      onClick={() => handleManualPointTrigger(color, 10)}
                      id="admin-bluepoints10plus"
                      disabled={isDisabled}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> +10 pts
                    </Button>

                    <Button
                      className="flex items-center bg-lddred  hover:brightness-125 text-white"
                      onClick={() => handleManualPointTrigger(color, -10)}
                      id="admin-bluepoints10minus"
                      disabled={isDisabled}
                    >
                      <MinusCircle className="mr-2 h-4 w-4" /> -10 pts
                    </Button>
                  </div>
                </section>
              );
            })}

            {/* Player Management */}
            {/* <div className="bg-gray-800 shadow rounded-lg p-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Player Management</h2>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-gray-300">Player ID</TableHead>
                    <TableHead className="text-gray-300">Username</TableHead>
                    <TableHead className="text-gray-300">Level</TableHead>
                    <TableHead className="text-gray-300">Last Login</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-gray-700">
                    <TableCell className="text-gray-300">001</TableCell>
                    <TableCell className="text-gray-300">GameMaster99</TableCell>
                    <TableCell className="text-gray-300">75</TableCell>
                    <TableCell className="text-gray-300">2023-09-25 14:30</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-gray-700">
                    <TableCell className="text-gray-300">002</TableCell>
                    <TableCell className="text-gray-300">EpicPlayer123</TableCell>
                    <TableCell className="text-gray-300">42</TableCell>
                    <TableCell className="text-gray-300">2023-09-25 12:15</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-gray-700">
                    <TableCell className="text-gray-300">003</TableCell>
                    <TableCell className="text-gray-300">NoobSlayer420</TableCell>
                    <TableCell className="text-gray-300">88</TableCell>
                    <TableCell className="text-gray-300">2023-09-25 15:45</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div> */}

            {/* Server Status */}
            {/* <div className="bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Server Status</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ServerStatusCard name="US East" status="Online" players="1,234" />
                <ServerStatusCard name="EU West" status="Online" players="2,345" />
                <ServerStatusCard name="Asia Pacific" status="Maintenance" players="0" />
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-gray-800 rounded-lg shadow p-4 flex items-center">
//       <div className="p-3 rounded-full bg-purple-600 bg-opacity-75">{icon}</div>
//       <div className="ml-4">
//         <p className="mb-2 text-sm font-medium text-gray-400">{title}</p>
//         <p className="text-lg font-semibold text-white">{value}</p>
//       </div>
//     </div>
//   );
// }

// function ServerStatusCard({ name, status, players }) {
//   const statusColor = status === "Online" ? "text-green-400" : "text-red-400";
//   return (
//     <div className="bg-gray-700 rounded-lg p-4">
//       <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
//       <p className={`text-sm font-medium ${statusColor}`}>{status}</p>
//       <p className="text-sm text-gray-300">Active Players: {players}</p>
//     </div>
//   );
// }
