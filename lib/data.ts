import { colors } from "./color";

export interface Playlist {
  id: string;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Liked Songs",
    color: colors.teal,
    cover:
      "/images/heart.png",
    artists: [""],
  },
  {
    id: "2",
    title: "Shipper Beats",
    color: colors.green,
    cover:
      "/images/Shipper beats cover.png",
    artists: ["Killswitches"],
  },
  {
    id: "3",
    title: "Rollbackin",
    color: colors.rose,
    cover:
      "./images/Rollback Mix cover.png",
    artists: ["Last Pipelines"],
  },
  {
    id: "4",
    title: "Ship The Beat",
    color: colors.red,
    cover:
      "/images/Cosmic vibes cover.png",
    artists: ["Lost Weekend"],
  },
  {
    id: "5",
    title: "Talkin Ship",
    color: colors.pink,
    cover:
      "/images/Launch Party Jams cover.png",
    artists: ["DevRelish"],
  },
  {
    id: "6",
    title: "Codebreaker Blues",
    color: colors.teal,
    cover:
      "/images/Codebreaker blues cover.png",
    artists: ["Tony T"],
  },
];

export const morePlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "a",
  })),
];

export const sidebarPlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "_side",
  })),
];

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
];

interface Song {
  id: string;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}
const songScale = "w_40,h_40,c_scale";
export const songs: Song[] = [
  {
    id: "1",
    title: "I'm a dev 4 you",
    image: `/images/dev-4-you.png`,
    artists: ["DJ Toggle"],
    album: "Release Beats",
    duration: "2:56",
  },
  {
    id: "2",
    title: "Code Me Maybe",
    image: `/images/Code me maybe.png`,
    artists: ["Blast Radius"],
    album: "Targeted Experience",
    duration: "3:53",
  },
  {
    id: "3",
    title: "Crash and Burn",
    image: `/images/crash-and-burn.png`,
    artists: ["The DevOperatos"],
    album: "Instant Recovery",
    duration: "2:23",
  },
  {
    id: "4",
    title: "MMMbyte",
    image: `/images/Kill switcher cover.png`,
    artists: ["Terminal Launch"],
    album: "RELEASE",
    duration: "5:13",
  },
  {
    id: "5",
    title: "Talk Contexts to Me",
    image: `/images/Used to code me cover.png`,
    artists: ["Lost Weekends"],
    album: "Reclaim",
    duration: "3:22",
  },
  {
    id: "6",
    title: "The Rollback",
    image: `/images/Rollin back to code cover.png`,
    artists: ["The Killswitches"],
    album: "Failure Recovery",
    duration: "3:14",
  },
  {
    id: "7",
    title: "Mobile Funk",
    image: `/images/Toggle U on cover.png`,
    artists: ["DevExcess"],
    album: "Today & Tomorrow",
    duration: "4:38",
  },
  {
    id: "9",
    title: "All Too Released",
    image: `/images/Such great insights cover.png`,
    artists: ["Jen Velocity"],
    album: "Blue",
    duration: "10:38",
  },
  {
    id: "9",
    title: "Just enough code",
    image: `/images/chasing-pipelines.png`,
    artists: ["Peter Pipelines"],
    album: "Never Enough Ship",
    duration: "4:38",
  },
  {
    id: "10",
    title: "Send and delivery",
    image: `/images/Is this launch cover.png`,
    artists: ["Tony T & The Codebreakers"],
    album: "Today & Tomorrow",
    duration: "4:38",
  },
  {
    id: "11",
    title: "Queen of Experiments",
    image: `/images/Flags on the brain cover.png`,
    artists: ["Brian Toggles"],
    album: "Data is Life",
    duration: "4:38",
  }, 
  {
    id: "12",
    title: "Set fire to the flags",
    image: `/images/Set fire to the flags cover.png`,
    artists: ["Ahmed"],
    album: "Reinvent Ship", 
    duration: "4:38",
  }
];