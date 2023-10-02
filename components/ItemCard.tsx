import { useRouter } from "next/router";
import type { Playlist } from "../lib/data";
import Link from "next/link";

interface Props {
  playlist: Playlist;
  onMouseEnter: (color: string) => void;
}

const ItemCard = ({ playlist, onMouseEnter }: Props) => {

  return (
    <Link
      key={playlist.id}
      href={`/playlist/${playlist.id}`}
      onMouseEnter={() => onMouseEnter(playlist.color.dark)}
      className="playlist-item flex group relative transition-all duration-300 overflow-hidden items-center gap-5 rounded-md shadow-lg hover:shadow-xl outline-none bg-zinc-500/30 hover:bg-zinc-500/50 focus:bg-zinc-500/50"
      data-color={playlist.color.dark}
    >
      <div className="h-20 w-20">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="object-cover h-full w-full shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
          
        />
      </div>
      <div className="font-bold block">{playlist.title}</div>
      <div
        className={
          "absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        }
      >
        {/* <PlayButton /> */}
      </div>
    </Link>
  );
};

export default ItemCard;
