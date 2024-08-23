import { useRouter } from "next/router";
import type { Playlist } from "../lib/data";
import Link from "next/link";
import { PlayIcon } from "lucide-react";

interface Props {
  playlist: Playlist;
}

const ItemCard = ({ playlist }: Props) => {
  return (
    <Link
      key={playlist.id}
      href={`/playlist/${playlist.id}`}
      className=" flex group relative transition-all duration-300 
      overflow-hidden items-center gap-4 rounded-md shadow-lg hover:shadow-xl outline-none
       bg-zinc-500/30 hover:bg-zinc-500/50 focus:bg-zinc-500/50"
      // data-color={playlist.color.dark}
    >
      <img
        src={playlist.cover}
        alt={playlist.title}
        className="object-cover h-20 w-20 shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
      />

      <h3 className="font-bold block mr-4">{playlist.title}</h3>
      <div
        className={
          "absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-ldbackground p-2"
        }
      >
        <PlayIcon />
      </div>
    </Link>
  );
};

export default ItemCard;
