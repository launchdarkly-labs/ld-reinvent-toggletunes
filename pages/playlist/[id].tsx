import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect } from "react";
import PlaylistArtists from "@/components/PlaylistArtists";
import { playlists, moreNewPlaylists, songs } from "@/lib/data";
import MusicTable from "@/components/MusicTable";
import { PlayIcon, HeartIcon, CircleEllipsisIcon } from "lucide-react";
import PlaylistTableSection from "@/components/PlaylistTableSection";

const Item = () => {
  const router = useRouter();
  const { id } = router.query; //string

  const allPlaylists = [...playlists, ...moreNewPlaylists];

  const playlist = allPlaylists.find((playlist) => playlist.id === parseInt(id, 10));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        key={playlist?.id}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="relative font-sohne bg-zinc-900 min-h-full flex flex-col overflow-x-hidden rounded-lg"
      >
        <PageHeader />
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-8 px-6 z-10">
          <div className="h-52 w-52 flex-none">
            <img
              src={playlist?.cover}
              alt={playlist?.title}
              className="object-cover h-full w-full shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-1 items-end">Playlist</div>
            <div>
              <h1 className="text-8xl font-bold block">
                {playlist?.title}
                <span></span>
              </h1>
            </div>
            <div className="flex-1 flex items-end">
              <div className="text-sm">
                {/* <PlaylistArtists artists={playlist?.artists} /> */}
                <div className="mt-1">
                  <span className="font-semibold">58 likes</span>, 83 musics,{" "}
                  <span className="text-gray-300">about 3h 15min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900/30 mt-6 flex-1 p-6 blur-100 z-10">
          <div className="flex gap-4 px-6 items-center">
            <PlayIcon className="h-14 w-14 rounded-full p-3 bg-ldbackground hover:brightness-125" />

        
            <HeartIcon className="h-8 w-8"/>
            <CircleEllipsisIcon className="h-8 w-8"/>
          </div>
          <div className="px-6 py-4  w-full flex flex-col ">
            <PlaylistTableSection songsAPI={songs} />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0.5, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.25,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute h-screen inset-0 z-0 bg-gradient-to-b from-context"
          style={
            {
              "--context-color": playlist?.color.accent,
            } as React.CSSProperties
          }
        >
          <div>
            <img
              src={playlist?.cover}
              alt={playlist?.title}
              className="z-[-1] absolute inset-0 mix-blend-overlay opacity-20 scale-90 w-full h-full object-cover blur-md"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Item;
