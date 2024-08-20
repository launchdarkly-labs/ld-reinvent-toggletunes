import { Music2Icon } from "lucide-react";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { motion } from "framer-motion";

const SideBar = ({ songsAPI, newtoggledb = "complete" }: any) => {
  return (
    <motion.nav
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col  gap-2"
    >
      <section className="bg-ldbackground rounded-md p-4">
        <img src="/images/ToggleTunes.png" className="w-2/3 mb-6" />
        <ul className="flex flex-col gap-y-4">
          <li key="1a">
            <Link
              href="/"
              className="flex gap-4 text-ldcomplicatedwhite  font-semibold transition-all duration-300"
            >
              <MdHome size={"1.5rem"} />
              Home
            </Link>
          </li>
          <li key="2b">
            <Link
              href="/"
              className="flex gap-4 text-zinc-400 hover:text-ldcomplicatedwhite font-semibold transition-all duration-300"
            >
              <FiSearch size={"1.5rem"} />
              Search
            </Link>
          </li>
        </ul>
      </section>

      <section className="bg-ldbackground rounded-md flex-1 overflow-auto scrollbar-hide px-4 py-4">
        <Link
          href="/"
          className="flex gap-4 text-ldcomplicatedwhite font-semibold text-2xl items-center font-extra mb-6"
        >
          <RxCounterClockwiseClock className="h-6 w-6" />
          <h2>Recently Played</h2>
        </Link>
        <section className=" overflow-y-auto scrollbar-hide">
          <ul className="flex flex-col gap-y-4">
            {songsAPI.map((song: any, index: any) => (
              <li key={index} className="flex items-center gap-2">
                {newtoggledb !== "complete" ? (
                  <Music2Icon className="h-8 w-8" />
                ) : (
                  <img src={song.image} alt={song.title} className="h-8 w-8 rounded-sm" />
                )}
                <span className="flex-grow">{song.title}</span>
                {/* <span>{song.duration}</span> */}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </motion.nav>
  );
};

export default SideBar;
