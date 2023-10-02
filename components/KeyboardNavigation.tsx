import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

export default function KeyboardNavigation() {
  const location = useRouter();

  const handleKeyPress = useCallback((event:any) => {
    switch (event.key) {
      case "h":
        location.push("/");
        break;
      case "1":
        location.push("/playlist/1");
        break;
      case "2":
        location.push("/playlist/2");
        break;
      case "3":
        location.push("/playlist/3");
        break;
      case "4":
        location.push("/playlist/4");
        break;
      case "5":
        location.push("/playlist/5");
        break;
      case "Escape":
        location.push("/")
        break;
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