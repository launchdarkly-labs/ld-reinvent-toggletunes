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
}: {
  winnerName: string;
  setOpenStartModal?: any;
}) {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    //hide the starting modal when you trigger manually the color winner
    if (winnerName !== "" && setOpenStartModal) {
      setOpenStartModal(false);
      // setIsOpen(true);
    }
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
