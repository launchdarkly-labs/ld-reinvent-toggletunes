//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import { PURPLE,RED,BLUE,GREEN } from "@/lib/constant";

export function Modal({
  winnerState,
  winnerName,
  setWinnerName,
  setWinnerState,
  setResetScores,
}: any) {

  useEffect(() => {
    console.log(winnerState);
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
        setWinnerState(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [winnerName, winnerState]);

// they overwrote alert dialog with the winner gif
//winnerState
  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogTrigger>
          <AlertDialogContent variant={winnerName}>
            <AlertDialogHeader />
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
