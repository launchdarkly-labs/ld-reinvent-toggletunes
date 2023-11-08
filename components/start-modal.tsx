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

export function StartModal({
  isTimerRunning,
  setIsTimerRunning,
  openStartModal,
  setOpenStartModal,
}) {
  function handleClick() {
    console.log(openStartModal);
    setOpenStartModal(false);
    console.log(openStartModal);
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
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
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
