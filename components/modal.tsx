//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";

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
        setWinnerName("red");
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
        setWinnerName("");
        setWinnerState(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [winnerName, winnerState]);

  return (
    <>
      <AlertDialog open={winnerState}>
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
