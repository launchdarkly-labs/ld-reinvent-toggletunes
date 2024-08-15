import { colors } from "./color";
export interface Playlist {
    id: number;
    title: string;
    color: (typeof colors)[keyof typeof colors];
    cover: string;
    artists: string;
  }
  
  export interface Song {
    id: number;
    title: string;
    image: string;
    artists: string;
    album: string;
    duration: string;
  }
  