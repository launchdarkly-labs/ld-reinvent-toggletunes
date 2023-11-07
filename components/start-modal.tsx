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
    console.log("clicked");
    setOpenStartModal(false);
    setIsTimerRunning(true);
  }
  return (
    <>
      <AlertDialog defaultOpen={true}>
        <AlertDialogTrigger asChild onClick={handleClick}>
          {openStartModal && (
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
          )}
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
}
