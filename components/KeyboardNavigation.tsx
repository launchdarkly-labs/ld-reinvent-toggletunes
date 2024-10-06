import { useCallback, useEffect } from "react";

export default function KeyboardNavigation({
  setGreenProgress,
  setRedProgress,
  setPurpleProgress,
  setBlueProgress,
}: {
  setGreenProgress: any;
  setRedProgress: any;
  setPurpleProgress: any;
  setBlueProgress: any;
}) {
  // const location = useRouter();

  const handleKeyPress = useCallback((event: any) => {
    switch (event.key) {
      case "r":
        //TODO: turn off key press r 
        // setGreenProgress(0);
        // setRedProgress(0);
        // setPurpleProgress(0);
        // setBlueProgress(0);
        // fetch("/api/apiReset");
        break;
      // case "1":
      //   location.push("/playlist/1");
      //   break;
      // case "2":
      //   location.push("/playlist/2");
      //   break;
      // case "3":
      //   location.push("/playlist/3");
      //   break;
      // case "4":
      //   location.push("/playlist/4");
      //   break;
      // case "5":
      //   location.push("/playlist/5");
      //   break;
      // case "Escape":
      //   location.push("/")
      //   break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return null;
}
