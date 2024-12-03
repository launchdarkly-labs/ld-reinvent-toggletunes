//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { PURPLE, RED, BLUE, GREEN } from "@/lib/constant";

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
          <AlertDialogContent variant={winnerName} className="cursor-pointer">
            <AlertDialogHeader />
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
