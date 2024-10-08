import {
  PERSONA_TIER_STANARD,
  PERSONA_ROLE_BETA,
  PERSONA_ROLE_DEVELOPER,
  PERSONA_TIER_PLATINUM,
  PERSONA_ROLE_USER,
} from "@/lib/constant";

import { Persona } from "./typesInterface";

export const STARTER_PERSONAS: Persona[] = [
  {
    personaname: "Christine",
    personatier: PERSONA_TIER_STANARD,
    personaimage: "/images/personas/persona3.png",
    personaemail: "user@launchmail.io",
    personarole: PERSONA_ROLE_USER,
  },
  {
    personaname: "Jenn",
    personatier: PERSONA_TIER_PLATINUM,
    personaimage: "/images/personas/woman.png",
    personaemail: "jenn@launchmail.io",
    personarole: PERSONA_ROLE_DEVELOPER,
  },
  // {
  //   personaname: "Angela",
  //   personatier: PERSONA_TIER_PLATINUM,
  //   personaimage: "/images/personas/persona6.jpg",
  //   personaemail: "angela@launchmail.io",
  //   personarole: PERSONA_ROLE_USER,
  //   personalaunchclubstatus: LAUNCH_CLUB_PLATINUM,
  //   personaEnrolledInLaunchClub: true,
  // },
  // {
  //   personaname: "Alysha",
  //   personatier: PERSONA_TIER_STANARD,
  //   personaimage: "/images/personas/beta.png",
  //   personaemail: "alysha@launchmail.io",
  //   personarole: PERSONA_ROLE_BETA,
  //   personalaunchclubstatus: LAUNCH_CLUB_STANDARD,
  //   personaEnrolledInLaunchClub: false,
  // },

  // {
  //   personaname: "Cody",
  //   personatier: PERSONA_TIER_STANARD,
  //   personaimage: "/images/personas/standard.jpg",
  //   personaemail: "cody@launchmail.io",
  //   personarole: PERSONA_ROLE_USER,
  //   personalaunchclubstatus: LAUNCH_CLUB_STANDARD,
  //   personaEnrolledInLaunchClub: false,
  // },
];
