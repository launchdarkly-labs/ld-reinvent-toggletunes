import React from "react";

interface Props {
  artists: string;
}

const PlaylistArtists: React.FC<Props> = ({ artists }) => {
  return (
    <>
      {/* {artists.map((artist: any, index: any) => ( */}
        <React.Fragment key='1'>
          {artists}
          {/* {index === artists.length - 1 ? " " : ", "} */}
        </React.Fragment>
      {/* ))} */}
    </>
  )
}

export default PlaylistArtists;