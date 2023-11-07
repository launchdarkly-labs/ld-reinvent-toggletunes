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
  setWinnerState,
  setResetScores,
  isExploding,
  setIsExploding,
}: any) {
  let winner = "";

  if (winnerName === "Green Team") {
    winner = "green";
  }
  if (winnerName === "Red Team") {
    winner = "red";
  }
  if (winnerName === "Purple Team") {
    winner = "purple";
  }
  if (winnerName === "Blue Team") {
    winner = "blue";
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setAnimationStarted(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <AlertDialog defaultOpen={true}>
        <AlertDialogTrigger asChild={winnerState}>
          {winnerState && (
            <AlertDialogContent variant={winner}>
              <AlertDialogHeader />
              <AlertDialogDescription className="flex place-content-center text-8xl pb-4 text-center font-audimat">
                WINNER!
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => {
                    setWinnerState(false),
                      setResetScores(true),
                      setIsExploding(false);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
