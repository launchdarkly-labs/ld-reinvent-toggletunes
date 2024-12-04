import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { PURPLE, RED, BLUE, GREEN } from "@/lib/constant";
import { useRouter } from "next/router";

export function Modal({
  winnerName,
  setOpenStartModal,
  setWinnerName,
}: // winnerState
{
  winnerName: string;
  setOpenStartModal?: any;
  setWinnerName?: any;
  // winnerState
}) {
  //const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    //hide the starting modal when you trigger manually the color winner
    if (winnerName !== "" && setOpenStartModal) {
      setOpenStartModal(false);
      // setIsOpen(true);
    }
  }, [winnerName]);
  const router = useRouter();

  useEffect(() => {
    if (!setWinnerName) {
      return;
    }
    const handleKeyDown = (event) => {
      if (event.key === "r") {
        setWinnerName(RED);
      }
      if (event.key === "b") {
        setWinnerName(BLUE);
      }
      if (event.key === "g") {
        setWinnerName(GREEN);
      }
      if (event.key === "p") {
        setWinnerName(PURPLE);
      }
      if (event.key === "Enter") {
        setWinnerName("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [winnerName]);

  const colorWinnerImage = {
    [RED]: "/images/gifs/redWinnerImg.svg",
    [BLUE]: "/images/gifs/blueWinnerImg.svg",
    [PURPLE]: "/images/gifs/purpleWinnerImg.svg",
  };

  const colorBackgroundImage = {
    [RED]: "bg-gradient-red-winner-background",
    [BLUE]: "bg-gradient-blue-winner-background",
    [PURPLE]: "bg-gradient-purple-winner-background",
  };

  // they overwrote alert dialog with the winner gif
  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogTrigger
        // asChild
        // onClick={() => {
        //   setIsOpen(false);
        // }}
        >
          {/* @ts-ignore */}
          <AlertDialogContent
            className={`${
              // @ts-ignore
              winnerName !== "" && `${colorBackgroundImage[winnerName]} flex items-center`
            }`}
          >
            {winnerName == "" ? null : (
              <img
                // @ts-ignore
                src={colorWinnerImage[winnerName]}
                alt="winner oclor"
                className={` w-full h-full ${
                  router.pathname === "/scoreboard" ? "object-cover" : "object-fit"
                }`}
              />
            )}
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
