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
      "./images/astronaut.png",
    artists: ["Last Pipelines"],
  },
  {
    id: "4",
    title: "Ship The Beat",
    color: colors.red,
    cover:
      "/images/ShipTheBeat.png",
    artists: ["Lost Weekend"],
  },
  {
    id: "5",
    title: "Talkin Ship",
    color: colors.pink,
    cover:
      "/images/TalkinShip.png",
    artists: ["DevRelish"],
  },
  
//   {
//     id: "6",
//     title: "Cow songs",
//     color: colors.gray,
//     cover:
//       "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776474/spotify-astro/R-15112137-1586815179-1911_fsyl58.jpg",
//     artists: ["Saint Hilda", "Canada Buffalo"],
//   },
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
    artists: ["Toggle"],
    album: "The Days / Nights",
    duration: "2:56",
  },
  {
    id: "2",
    title: "Crash and Burn",
    image: `/images/crash-and-burn.png`,
    artists: ["Toggle"],
    album: "Hollywood's Bleeding",
    duration: "2:23",
  },
  {
    id: "3",
    title: "MMMbyte",
    image: `/images/mmmbyte.png`,
    artists: ["Terminal Launch"],
    album: "ASTROWORLD",
    duration: "5:13",
  },
  {
    id: "4",
    title: "Talk Contexts to Me",
    image: `/images/talk-contexts.png`,
    artists: ["Lost Weekends"],
    album: "After Hours",
    duration: "3:22",
  },
  {
    id: "5",
    title: "Chasing Pipelines",
    image: `/images/chasing-pipelines.png`,
    artists: ["Blast Radius"],
    album: "÷ (Divide)",
    duration: "3:53",
  },
  {
    id: "6",
    title: "Career Regrets",
    image: `/images/chasing-pipelines.png`,
    artists: ["Jackie & The Switch"],
    album: "Uptown Special",
    duration: "4:30",
  },
  {
    id: "7",
    title: "The Rollback",
    image: `/images/Rollin back to code cover.png`,
    artists: ["The Killswitches"],
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: "3:14",
  },
  {
    id: "8",
    title: "Mobile Funk",
    image: `/images/chasing-pipelines.png`,
    artists: ["devExcess"],
    album: "Today & Tomorrow",
    duration: "4:38",
  },
  {
    id: "9",
    title: "Just enough code",
    image: `/images/chasing-pipelines.png`,
    artists: ["DevRelish"],
    album: "Today & Tomorrow",
    duration: "4:38",
  },
  {
    id: "10",
    title: "Send and delivery",
    image: `/images/chasing-pipelines.png`,
    artists: ["DevRelish"],
    album: "Today & Tomorrow",
    duration: "4:38",
  },
  {
    id: "11",
    title: "Queen of Experiments",
    image: `/images/chasing-pipelines.png`,
    artists: ["DevRelish"],
    album: "Today & Tomorrow",
    duration: "4:38",
  }, 
  {
    id: "12",
    title: "Set fire to the flags",
    image: `/images/Set fire to the flags cover.png`,
    artists: ["DevRelish"],
    album: "Reinvent Ship", 
    duration: "4:38",
  }
  
  // {
  //   id: "9",
  //   title: "Havana",
  //   image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_9_szemzp.jpg`,
  //   artists: ["Camila Cabello", "Young Thug"],
  //   album: "Camila",
  //   duration: "3:37",
  // },
  // {
  //   id: "10",
  //   title: "Radioactive",
  //   image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
  //   artists: ["Imagine Dragons"],
  //   album: "Night Visions",
  //   duration: "3:07",
  // },
];