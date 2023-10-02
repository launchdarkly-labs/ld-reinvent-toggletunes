import { Home, Library, Search } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="bg-gray-900 rounded-lg">
        <ul>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-zinc-400 hover:text-zinc-100 py-3.5 px-5 font-semibold transition-all duration-300"
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

      <div className="bg-gray-900 rounded-lg flex-1">
        <ul>
          <li>
            <Link
              href="/"
              className="flex gap-4 text-zinc-400 hover:text-zinc-100 py-3.5 px-5 font-semibold "
            >
              <Library className="h-6 w-6" />
              Your Library
            </Link>
          </li>
        </ul>
        <ul className="pl-2">
          {/* {sidebarPlaylists.map((playlist) => <SideItemCard {playlist} />)} */}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
