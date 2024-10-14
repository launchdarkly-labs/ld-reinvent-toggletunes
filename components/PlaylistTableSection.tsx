import { motion } from "framer-motion";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Music2Icon } from "lucide-react";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { songs } from "@/lib/data";
import { SongInterface } from "@/lib/typesInterface";

const PlaylistTableSection = ({ playlistSongs = songs, backUpMigrateNewSongDB }: { playlistSongs: SongInterface[], backUpMigrateNewSongDB?:string }) => {
  //const migrateNewSongDBLDFlag: string = useFlags()["migrate-new-song-db"];
  const migrateNewSongDBLDFlag: string = "complete";
  let useableMigrateNewSongDB:string = ""
  if(backUpMigrateNewSongDB){
    useableMigrateNewSongDB = backUpMigrateNewSongDB;//TODO: [id] isn't exposed to LD flags bc it isn't wrapped in it. need to deal with it
  } else {
    useableMigrateNewSongDB = migrateNewSongDBLDFlag
  }
console.log(migrateNewSongDBLDFlag)
  return (
    <table id="songs-bulleted-list">
      <thead>
        <tr
          className="grid grid-cols-[minmax(0,_0.1fr)_minmax(0,_1.5fr)__minmax(0,_1fr)_minmax(0,_0.2fr)] items-center 
                             border-b-2  border-b-gray-600/40 p-3 justify-items-start text-base"
        >
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th className="mx-auto">
            <RxCounterClockwiseClock className="h-5 w-5" />
          </th>
        </tr>
      </thead>
      <tbody className=" ">
        {playlistSongs.map((song: any, index: number) => (
          <motion.tr
            initial={{ opacity: 0, scale: 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
              delay: index * 0.2,
            }}
            key={`${song.id} ${index}`}
            className="grid grid-cols-[minmax(0,_0.1fr)_minmax(0,_1.5fr)__minmax(0,_1fr)_minmax(0,_0.2fr)] items-center  text-lg
                           p-3 hover:bg-gray-500/20 cursor-default"
          >
            <td className="">{index + 1}</td>
            <td className="flex gap-x-4 items-center">
              {useableMigrateNewSongDB?.includes("off") || useableMigrateNewSongDB === undefined ? (
                <Music2Icon className="h-10 w-10" />
              ) : song?.image ? (
                <img src={song?.image} className="h-10 w-10" />
              ) : (
                <div
                  className={`h-10 w-10`}
                  style={{
                    backgroundImage: `conic-gradient(${song?.albumColor[0]}, ${song?.albumColor[1]}, ${song?.albumColor[2]}, ${song?.albumColor[3]})`,
                  }}
                />
              )}

              <span className="flex flex-col">
                <p>{song?.title}</p>
                <p className="text-base text-gray-500">{song?.artists}</p>
              </span>
            </td>

            <td className="">
              <p>{song?.album}</p>
            </td>
            <td className=" text-gray-500 mx-auto">
              <p>{song?.duration}</p>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlaylistTableSection;
