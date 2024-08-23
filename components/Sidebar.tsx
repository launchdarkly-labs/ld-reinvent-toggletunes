import { Music2Icon } from "lucide-react";
import { MdHome } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { motion } from "framer-motion";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

const SideBar = ({ songsAPI }: any) => {
  const {
    newtoggledb = "off",
  }: {
    newtoggledb: string;
  } = useFlags();
  console.log(songsAPI)

  return (
    <motion.nav
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col  gap-2 h-full"
    >
      <section className="bg-ldbackground rounded-md p-4">
        <img src="/images/ToggleTunes.png" className="w-2/3 mb-6" />
        <ul className="flex flex-col gap-y-4">
          <li
            key="1a"
            className="flex gap-4 text-ldcomplicatedwhite  font-semibold transition-all duration-300 cursor-default"
          >
            <MdHome size={"1.5rem"} />
            Home
          </li>
          <li
            key="2b"
            className="flex gap-4 text-zinc-400 hover:text-ldcomplicatedwhite font-semibold transition-all duration-300 cursor-default"
          >
            <FiSearch size={"1.5rem"} />
            Search
          </li>
        </ul>
      </section>

      <section className="bg-ldbackground rounded-md flex-1 p-4 h-full">
        <h2 className="flex gap-4 text-ldcomplicatedwhite font-semibold text-2xl items-center font-extra mb-6 ">
          <RxCounterClockwiseClock className="h-6 w-6" />
          Recently Played
        </h2>
        <div className="">
          <ul className="flex flex-col gap-y-4  overflow-y-auto  h-[calc(100vh-21rem)] sm:h-[calc(100vh-24rem)]" >
            {songsAPI.map((song: any, index: number) => (
              <li key={index} className="flex items-center gap-2 cursor-default">
                {newtoggledb?.includes("off") ? (
                  <Music2Icon className="h-8 w-8" />
                ) : (
                  <img src={song.image} alt={song.title} className="h-8 w-8 rounded-sm" />
                )}
                <span className="flex-grow">{song.title}</span>
                {/* <span>{song.duration}</span> */}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </motion.nav>
  );
};

export default SideBar;
