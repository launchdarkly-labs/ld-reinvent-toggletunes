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
  openStartModal,
  setOpenStartModal,
  setIsTimerRunning,
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
