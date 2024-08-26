import { colors } from "./color";
import { Playlist, Song } from "./typesInterface";

export const playlists: Playlist[] = [
  {
    id: 1,
    title: "Liked Songs",
    color: colors.teal,
    cover: "/images/heart.png",
    artists: "",
  },
  {
    id: 2,
    title: "Shipper Beats",
    color: colors.green,
    cover: "/images/Shipper beats cover.png",
    artists: "Killswitches",
  },
  {
    id: 3,
    title: "Rollbackin",
    color: colors.rose,
    cover: "./images/Rollback Mix cover.png",
    artists: "Last Pipelines",
  },
];

export const moreNewPlaylists: Playlist[] = [
  {
    id: 1,
    title: "Liked Songs",
    color: colors.teal,
    cover: "/images/heart.png",
    artists: "",
  },
  {
    id: 2,
    title: "Shipper Beats",
    color: colors.green,
    cover: "/images/Shipper beats cover.png",
    artists: "Killswitches",
  },
  {
    id: 3,
    title: "Rollbackin",
    color: colors.rose,
    cover: "./images/Rollback Mix cover.png",
    artists: "Last Pipelines",
  },
];

export const songs: Song[] = [
  {
    id: 1,
    title: "I'm a dev 4 you",
    image: `/images/Casette.png`,
    artists: "DJ Toggle",
    album: "Release Beats",
    duration: "2:56",
  },
  {
    id: 2,
    title: "Code Me Maybe",
    image: `/images/Code me maybe.png`,
    artists: "Blast Radius",
    album: "Targeted Experience",
    duration: "3:53",
  },
  {
    id: 3,
    title: "Crash and Burn",
    image: `/images/Spotlight.png`,
    artists: "The DevOperatos",
    album: "Instant Recovery",
    duration: "2:23",
  },
  {
    id: 4,
    title: "MMMbyte",
    image: `/images/Kill switcher cover.png`,
    artists: "Terminal Launch",
    album: "RELEASE",
    duration: "5:13",
  },
  {
    id: 5,
    title: "Talk Contexts to Me",
    image: `/images/Used to code me cover.png`,
    artists: "Lost Weekends",
    album: "Reclaim",
    duration: "3:22",
  },
];

export const moreNewSongs: Song[] = [
  {
    id: 1,
    title: "I'm a dev 4 you",
    image: `/images/Casette.png`,
    artists: "DJ Toggle",
    album: "Release Beats",
    duration: "2:56",
  },
  {
    id: 2,
    title: "Code Me Maybe",
    image: `/images/Code me maybe.png`,
    artists: "Blast Radius",
    album: "Targeted Experience",
    duration: "3:53",
  },
  {
    id: 3,
    title: "Crash and Burn",
    image: `/images/Spotlight.png`,
    artists: "The DevOperatos",
    album: "Instant Recovery",
    duration: "2:23",
  },
  {
    id: 4,
    title: "MMMbyte",
    image: `/images/Kill switcher cover.png`,
    artists: "Terminal Launch",
    album: "RELEASE",
    duration: "5:13",
  },
  {
    id: 5,
    title: "Talk Contexts to Me",
    image: `/images/Used to code me cover.png`,
    artists: "Lost Weekends",
    album: "Reclaim",
    duration: "3:22",
  },
];
