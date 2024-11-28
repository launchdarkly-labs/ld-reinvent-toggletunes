//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Dialog, DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "./ui/dialog";

export function StartModal({
  openStartModal,
  setOpenStartModal,
  setIsTimerRunning,
  animationStarted,
  setAnimationStarted,
}) {
  function handleClick() {
    setOpenStartModal(false);
    setIsTimerRunning(true);
  }
  return (
    <>
      <AlertDialog open={openStartModal}>
        <AlertDialogTrigger asChild onClick={handleClick}>
          <AlertDialogContent variant="start">
            {/* <AlertDialogHeader /> */}
            <AlertDialogTitle
              setOpenStartModal={setOpenStartModal}
              setAnimationStarted={setAnimationStarted}
              setIsTimerRunning={setIsTimerRunning}
              animationStarted={animationStarted}
            />
            <div className="flex items-center justify-center text-center text-6xl pb-4"             id = "starter-dialog">
              Get Ready for the Next Round!
            </div>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
