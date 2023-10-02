import React from "react";

interface Props {
  artists: string[];
}

const PlaylistArtists: React.FC<Props> = ({ artists }) => {
  return (
    <>
      {artists.map((artist, index) => (
        <React.Fragment key={index}>
          {artist}
          {index === artists.length - 1 ? " " : ", "}
        </React.Fragment>
      ))}
    </>
  )
}

export default PlaylistArtists;