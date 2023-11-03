//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function StartModal({isTimerRunning, setIsTimerRunning}) {
const [openStartModal, setOpenStartModal] = useState(true);

  return (
    <>
      <AlertDialog defaultOpen={true}>
        <AlertDialogTrigger asChild>
          {openStartModal && (
            <AlertDialogContent variant="start">
              <AlertDialogHeader />
              <AlertDialogTitle
                openStartModal={openStartModal}
                setOpenStartModal={setOpenStartModal}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
              />
              <AlertDialogFooter className="flex place-content-center text-amber-500 text-center text-6xl pb-4 font-audimat">
                Get Ready for the Next Round!
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
