import { colors } from "./color";
export interface PlaylistInterface {
    id: string;
    title: string;
    color?: (typeof colors)[keyof typeof colors];
    cover: string;
    songs: SongInterface[]
  }
  
  export interface SongInterface {
    id: string;
    title: string;
    image?: string;
    albumColor?: string,
    artists: string;
    album: string;
    duration: string;
  }
  
