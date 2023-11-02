import { songs } from "@/lib/data";
import { Home, Library, Music2Icon, Search } from "lucide-react";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";

const SideBar = ({ playlist, userplaylist }: any) => {
  return (
    <div
      className="flex flex-col h-screen gap-2"
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      <div className="bg-ldbackground rounded-xl">
        <img src="/images/ToggleTunes.png" className="ml-5 mt-5 pb-4 w-2/3" />
        <ul>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-ldcomplicatedwhite py-3.5 px-5 font-semibold transition-all duration-300"
            >
              <MdHome size={"1.5rem"} />
              {/* <Home className="h-6 w-6" /> */}
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-zinc-400 hover:text-ldcomplicatedwhite py-3.5 px-5 font-semibold transition-all duration-300"
            >
              <FiSearch size={"1.5rem"} />
              Search
            </Link>
          </li>
        </ul>
      </div>

      <div className="bg-ldbackground rounded-lg flex-1 min-h-0 overflow-auto scrollbar-hide">
        <ul>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-ldcomplicatedwhite py-3.5 px-5 font-semibold text-2xl items-center font-extra pb-8"
            >
              <RxCounterClockwiseClock className="h-6 w-6" />
              Recently Played
            </Link>
          </li>
        </ul>
        <div className="px-4 overflow-y-auto scrollbar-hide ml-2">
          <ul>
            {songs.map((song) => (
              <li key={song.id} className="flex items-center gap-2 py-2">
                {playlist && !userplaylist ? (
                  <Music2Icon className="h-10 w-10 mr-5" />
                ) : (
                  <img src={song.image} alt={song.title} className="h-8 w-8" />
                )}
                <span className="flex-grow">{song.title}</span>
                {/* <span>{song.duration}</span> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
