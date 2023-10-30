import { songs } from "@/lib/data";
import { Home, Library, Search } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col h-screen gap-2">
      <div className="bg-ldgray rounded-lg">
        <img src="/images/tuneslogo.png" className="ml-5 mt-5" />
        <ul>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-zinc-100 py-3.5 px-5 font-semibold transition-all duration-300"
            >
              <Home className="h-6 w-6" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-zinc-400 hover:text-zinc-100 py-3.5 px-5 font-semibold transition-all duration-300"
            >
              <Search className="h-6 w-6" />
              Search
            </Link>
          </li>
        </ul>
      </div>

      <div className="bg-ldgray rounded-lg flex-1 min-h-0 overflow-auto">
        <ul>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-zinc-100  py-3.5 px-5 font-semibold "
            >
              <Library className="h-6 w-6" />
              Recently Played
            </Link>
          </li>
        </ul>
        <ul className="px-4">
          {songs.map((song) => (
            <li key={song.id} className="flex items-center gap-2 py-2">
              <img src={song.image} alt={song.title} className="h-8 w-8" />
              <span className="flex-grow">{song.title}</span>
              <span>{song.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
