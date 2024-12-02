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

export function Modal({ winnerName, setOpenStartModal }: {winnerName: string, setOpenStartModal?: any}) {
  useEffect(() => {
    //hide the starting modal when you trigger manually the color winner
    if (winnerName !== "" && setOpenStartModal) {
      setOpenStartModal(false);
    }
  }, [winnerName]);

  // they overwrote alert dialog with the winner gif
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
