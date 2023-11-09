//@ts-nocheck
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
            <AlertDialogHeader />
            <AlertDialogTitle
              openStartModal={openStartModal}
              setOpenStartModal={setOpenStartModal}
              animationStarted={setAnimationStarted}
              setAnimationStarted={setAnimationStarted}
              setIsTimerRunning={setIsTimerRunning}
              animationStarted={animationStarted}
            />
            <AlertDialogFooter className="flex place-content-center text-center text-6xl pb-4">
              Get Ready for the Next Round!
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
