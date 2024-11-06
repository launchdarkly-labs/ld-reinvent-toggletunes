// @ts-ignore
import { useLDClient } from "launchdarkly-react-client-sdk";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import CryptoJS from "crypto-js";
import { setCookie, getCookie } from "cookies-next";
import { LD_CONTEXT_COOKIE_KEY } from "@/lib/constant";
import { STARTER_PERSONAS } from "@/lib/StarterUserPersonas";
import { Persona } from "@/lib/typesInterface";
import type { LoginContextType } from "@/lib/typesInterface";
import { LDContext } from "launchdarkly-js-client-sdk";

const startingUserObject = {
  personaname: "",
  personatier: "",
  personaimage: "",
  personaemail: "",
  personarole: "",
  personalaunchclubstatus: "",
  personaEnrolledInLaunchClub: false,
};

const LoginContext = createContext<LoginContextType>({
  userObject: startingUserObject,
  isLoggedIn: false,
  async updateAudienceContext() {},
  async loginUser() {},
  async logoutUser() {},
  allUsers: [],
});

export default LoginContext;

// const operatingSystem = "macOS";
// const device = "Desktop";

export const LoginProvider = ({ children }: { children: any }) => {
  const client = useLDClient();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userObject, setUserObject] = useState<Persona>(STARTER_PERSONAS[0]);
  const [allUsers, setAllUsers] = useState<Persona[]>(STARTER_PERSONAS);

  const hashEmail = async (email: string): Promise<string> => {
    //return CryptoJS.SHA256(email).toString();
    return uuidv4().slice(0, 10);
  };

  const loginUser = async (email: string): Promise<void> => {
    //need to keep this here in order to pull getcookie and get same audience key as you initialized it
    const ldContextCookieKey: string | undefined = getCookie(LD_CONTEXT_COOKIE_KEY);
    const existingAudienceKey: string =
      ldContextCookieKey && JSON.parse(ldContextCookieKey)?.audience?.key;

    if (Object.keys(userObject).length > 0) {
      //to update the all personas array with the changes
      setAllUsers((prevObj) => [
        ...prevObj.filter((persona) => persona?.personaemail !== userObject?.personaemail),
        userObject,
      ]);
    }
    // @ts-ignore
    const context: LDContext = await client?.getContext();
    //don't know how to fix this without using undefined
    // @ts-ignore
    const foundPersona: Persona = allUsers?.find((persona) =>
      persona?.personaemail?.includes(email)
    );
    await setUserObject(foundPersona);
    // @ts-ignore
    context.user.name = foundPersona?.personaname;
    // @ts-ignore
    context.user.email = foundPersona?.personaemail;
    const hashedEmail = await hashEmail(email);
    // @ts-ignore
    context.user.anonymous = false;
    // @ts-ignore
    context.user.key = hashedEmail;
    // @ts-ignore
    context.user.role = foundPersona?.personarole;
    // context.user.tier = foundPersona?.personatier;
    // context.audience.key = existingAudienceKey;

    await client?.identify(context);
    console.log("loginUser", context);
    console.log(foundPersona?.personaname, foundPersona?.personaemail, foundPersona?.personarole);

    setCookie(LD_CONTEXT_COOKIE_KEY, context);
    setIsLoggedIn(true);
  };

  // const updateAudienceContext = async (): Promise<void> => {
  //   const context = await client?.getContext();
  //   console.log("updateAudienceContext", context);
  //   context.audience.key = uuidv4().slice(0, 10);
  //   await client?.identify(context);
  // };

  // const logoutUser = async (): Promise<void> => {
  //   const ldContextCookieKey: string | undefined = getCookie(LD_CONTEXT_COOKIE_KEY);
  //   const existingAudienceKey: string =
  //     ldContextCookieKey && JSON.parse(ldContextCookieKey)?.audience?.key;
  //   setIsLoggedIn(false);
  //   setUserObject(startingUserObject);
  //   setAllUsers(STARTER_PERSONAS);
  //   //need to keep this here in order to pull getcookie and get same audience key as you initialized it
  //   const createAnonymousContext = {
  //     kind: "multi",
  //     user: {
  //       anonymous: true,
  //     },
  //     device: {
  //       key: device,
  //       name: device,
  //       operating_system: operatingSystem,
  //       platform: device,
  //     },
  //     location: {
  //       key: "America/New_York",
  //       name: "America/New_York",
  //       timeZone: "America/New_York",
  //       country: "US",
  //     },
  //     experience: {
  //       key: "a380",
  //       name: "a380",
  //       airplane: "a380",
  //     },
  //     audience: {
  //       key: existingAudienceKey,
  //     },
  //   };
  //   const context = createAnonymousContext;
  //   await client?.identify(context);
  //   setCookie(LD_CONTEXT_COOKIE_KEY, context);
  //   console.log("Anonymous User", context);
  //   setCookie("ldcontext", context);
  // };

  return (
    <LoginContext.Provider
      // @ts-ignore
      value={{
        userObject,
        isLoggedIn,
        // updateAudienceContext,
        loginUser,
        // logoutUser,
        allUsers,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
