import { PlaylistInterface, SongInterface } from "@/lib/typesInterface";
import React from "react";

const FourAlbumArtCard = ({ playlist }: { playlist: PlaylistInterface }) => {
  return (
    <>
      {playlist.songs.map((song: SongInterface, index: number) => {
        if (index > 3) return;
        let backupBGColor = "";
        let roundedCorner = "";

        if (index === 0) {
          backupBGColor = "bg-green-500";
          roundedCorner = "rounded-tl-md";
        }

        if (index === 1) {
          backupBGColor = "bg-blue-500";
          roundedCorner = "rounded-tr-md";
        }

        if (index === 2) {
          backupBGColor = "bg-purple-500";
          roundedCorner = "rounded-bl-md";
        }

        if (index === 3) {
          backupBGColor = "bg-yellow-500";
          roundedCorner = "rounded-br-md";
        }

        return (
          <span
            className={`${backupBGColor} ${roundedCorner} h-full w-full`}
            style={{
              backgroundImage: `conic-gradient(${song?.albumColor[0]}, ${song?.albumColor[1]}, ${song?.albumColor[2]}, ${song?.albumColor[3]})`,
            }}
            key={song.id}
          ></span>
        );
      })}
    </>
  );
};

export default FourAlbumArtCard;
