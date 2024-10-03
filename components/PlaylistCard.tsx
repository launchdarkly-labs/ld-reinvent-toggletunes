import Link from "next/link";
import PlaylistArtists from "./PlaylistArtists";
import { PlaylistInterface } from "@/lib/typesInterface";

interface Props {
  playlist: PlaylistInterface;
}

const PlaylistCard = ({ playlist }: Props) => {
  return (
      <Link
      key={playlist.id}
        href={`/playlist/${playlist.id}`}
        className="playlist-card p-4 flex-col items-center group relative transition-all duration-300 overflow-hidden gap-5 rounded-md shadow-lg hover:shadow-xl outline-none bg-zinc-500/5 hover:bg-zinc-500/20 focus:bg-zinc-500/20"
        data-color={playlist?.color?.dark}
      >
        <div className="w-40">
          <div className="relative group mx-auto h-40 w-full flex-none shadow-lg">
            <img
              src={playlist.cover}
              alt={playlist.title}
              className="object-cover h-full w-full rounded-md shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
            />
            <div className="absolute right-2 bottom-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
              {/* <PlayButton /> */}
            </div>
          </div>
          <div className="pt-2">
            <div className="font-bold block truncate">{playlist.title}</div>
            {/* <div className="text-gray-400 text-xs">
              <PlaylistArtists artists={playlist?.artists} />
            </div> */}
          </div>
        </div>
      </Link>
  );
};

export default PlaylistCard;
