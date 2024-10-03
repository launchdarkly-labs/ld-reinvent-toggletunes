import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useContext } from "react";
import { playlists, moreNewPlaylists, songs, defaultListOfCohereGeneratedSongs } from "@/lib/data";
import { PlayIcon, HeartIcon, CircleEllipsisIcon } from "lucide-react";
import PlaylistTableSection from "@/components/PlaylistTableSection";
import AIGeneratedPlaylistContext from "@/lib/AIGeneratedPlaylistContext";
import { PlaylistInterface, AIModelInterface } from "@/lib/typesInterface";
import FourAlbumArtCard from "@/components/FourAlbumArtCard";
import { aiModelColors } from "@/lib/utils";

const Item = () => {
  const router = useRouter();
  const { id } = router.query; //string

  const { aiPlaylists } = useContext(AIGeneratedPlaylistContext);

  const allPlaylists: PlaylistInterface[] = [...playlists, ...moreNewPlaylists, ...aiPlaylists];
// @ts-ignore
  let playlist: PlaylistInterface = allPlaylists.find((playlist) => playlist.id === id);

  if (playlist === undefined) {
    playlist = playlists[0];
  }
  const playlistSongs = playlist?.songs ? playlist?.songs : songs;

  const totalDurationPlaylist = () => {
    let totalDuration: string = "",
      totalMinutesDuration: number = 0,
      totalSecondsDuration: number = 0,
      totalHoursDuration: number = 0;

    for (const songs of playlistSongs) {
      const arrSongDuration = songs.duration.split(":");
      totalMinutesDuration = totalMinutesDuration + parseInt(arrSongDuration[0]);
      totalSecondsDuration = totalSecondsDuration + parseInt(arrSongDuration[1]);
    }

    if (totalSecondsDuration >= 60) {
      const leftoverSecond = totalSecondsDuration % 60;
      totalMinutesDuration = totalMinutesDuration + (totalSecondsDuration - leftoverSecond) / 60;
      totalSecondsDuration = leftoverSecond;
    }

    if (totalMinutesDuration >= 60) {
      const leftoverMinutes = totalMinutesDuration % 60;
      totalHoursDuration = (totalSecondsDuration - leftoverMinutes) / 60;
      totalMinutesDuration = leftoverMinutes;
    }

    totalDuration = `${
      totalHoursDuration > 0 ? `${totalHoursDuration} hr` : ""
    } ${totalMinutesDuration} min ${totalHoursDuration > 0 ? "" : `${totalSecondsDuration} sec`} `;

    return totalDuration;
  };

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
        className="relative font-sohne bg-zinc-900 min-h-full flex flex-col overflow-x-hidden"
      >
        <PageHeader />
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-8 px-6 z-10">
          <div
            className={`h-52 w-52  ${
              playlist?.cover ? "flex-none" : "grid grid-cols-2 grid-rows-2"
            }`}
          >
            {playlist?.cover ? (
              <img
                src={playlist?.cover}
                alt={playlist?.title}
                className="object-cover h-full w-full shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
              />
            ) : (
              <FourAlbumArtCard playlist={playlist} />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="flex flex-1 items-end mb-2">Playlist</h3>

            <h1 className="text-8xl font-bold  mb-4">{playlist?.title}</h1>

            <div className="flex-1 flex items-end">
              <div className="text-base">
                <p className="">
                  Created by:{" "}
                  <span
                    style={{ color: aiModelColors(playlist.createdBy), fontWeight: "900" }}
                    className="px-[4px] rounded-full bg-slate-50 bg-opacity-40 brightness-125"
                  >
                    {playlist.createdBy}
                  </span>
                </p>
                <div className="mt-1">
                  <span className="font-semibold">{playlist?.songs?.length} songs, </span>
                  <span className="text-gray-300">about {totalDurationPlaylist()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900/30 mt-6 flex-1 p-6 blur-100 z-10">
          <div className="flex gap-4 px-6 items-center">
            <PlayIcon className="h-14 w-14 rounded-full p-3 bg-ldbackground hover:brightness-125" />
            <HeartIcon className="h-8 w-8" />
            <CircleEllipsisIcon className="h-8 w-8" />
          </div>
          <div className="px-6 py-4  w-full flex flex-col ">
            <PlaylistTableSection playlistSongs={playlistSongs} />
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
              "--context-color": playlist?.color?.accent,
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
