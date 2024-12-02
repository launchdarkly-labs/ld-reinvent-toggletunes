//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import { PURPLE, RED, BLUE, GREEN } from "@/lib/constant";

export function Modal({
  winnerState,
  winnerName,
  setWinnerName,
  setWinnerState,
  setResetScores,
  setOpenStartModal
}: any) {

  useEffect(() => { //hide the starting modal when you trigger manually the color winner
    if (winnerName !== "") {
      setOpenStartModal(false);
    }
  }, [winnerName]);

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
