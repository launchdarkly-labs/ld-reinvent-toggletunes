import { colors } from "./color";
export interface PlaylistInterface {
  id: string;
  title: string;
  color?: (typeof colors)[keyof typeof colors];
  cover: string;
  songs: SongInterface[];
  createdBy: string;
}

export interface SongInterface {
  id: string;
  title: string;
  image?: string;
  artists: string;
  album: string;
  albumColor?: string[];
  duration: string;
  playlistName?: string;
}

export interface AIModelInterface {
  max_tokens: number;
  modelId: string;
  p: number;
  temperature: number;
}

export type LoginUserFunctionType = (email: string) => Promise<void>;
export interface Persona {
  personaname: string;
  personatier: string;
  personaimage: string;
  personaemail: string;
  personarole: string;
  personalaunchclubstatus: string;
  personaEnrolledInLaunchClub: boolean;
}

export type LoginContextType = {
  userObject: Persona;
  isLoggedIn: boolean;
  upgradeLaunchClubStatus: () => Promise<void>;
  // setPlaneContext:()=> Promise<void>;
  enrollInLaunchClub: () => void;
  updateAudienceContext: () => Promise<void>;
  loginUser: LoginUserFunctionType;
  logoutUser: () => Promise<void>;
  allUsers: Persona[];
};
