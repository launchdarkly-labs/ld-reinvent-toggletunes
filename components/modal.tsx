//@ts-nocheck
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Modal({
  winnerState,
  winnerName,
  setWinnerName,
  setWinnerState,
  setResetScores,
}: any) {
  // let winner = "green";
  // if (winnerName === "Green Team") {
  //   winner = "green";
  // }
  // if (winnerName === "Red Team") {
  //   winner = "red";
  // }
  // if (winnerName === "Purple Team") {
  //   winner = "purple";
  // }
  // if (winnerName === "Blue Team") {
  //   winner = "blue";
  // }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r") {
        setWinnerName("red")
      }
      if (event.key === "b") {
        setWinnerName("blue");
      }
      if (event.key === "g") {
        setWinnerName("green");
      }
      if (event.key === "p") {
        setWinnerName("purple");
      }
      if (event.key === "Enter") {
        setWinnerName("")
        setWinnerState(false)
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [winnerName]);

  return (
    <>
      <AlertDialog open={winnerState}>
        <AlertDialogTrigger>
            <AlertDialogContent variant={winnerName}>
              <AlertDialogHeader />
              <AlertDialogFooter>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
